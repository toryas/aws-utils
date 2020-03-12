const { getAWSSdk } = require('../service/sdk.service');

/**
 * S3Element
 * @typedef {object} S3Element
 * @property {string} bucket
 * @property {string} key
 * @property {string} path
 * @property {string} file
 */



/**
 * Copy a S3 Object to new destination
 * 
 * @param {string} fileURL S3 Object's URL  example: s3://myBucket/folder/file.txt
 * @param {string} newBucket  destination bucket EJ: otherFolder/file.txt
 * @param {string} newKey  S3 Key destination EJ: otherFolder/file.txt
 * @return {string|false} return S3 Object's URL destination if process success. false for any error.
 */
const s3CopyFile = async (fileURL, newBucket, newKey) => {
    try {
        let aws = getAWSSdk();
        let s3 = new aws.S3();
        let s3Elements = s3URLDeconstruct(fileURL);
        let paramsCopy = {
            Bucket: newBucket,
            CopySource: `${s3Elements.bucket}/${s3Elements.newKey}`,
            Key: newKey
        }
        let resp = await s3.copyObject(paramsCopy).promise();
        return `s3://${newBucket}/${newKey}`;
    } catch (e) {
        return false;
    }
}

/**
 * Delete a s3 Object
 * @param {string} bucket  S3 Bucket's name example: myBucket
 * @param {string} key  S3 Object's key example: path/file.txt
 * @returns {Boolean} if delete are done "true" else "false"
 */
const s3DeleteFile = async (bucket, key) => {
    try {
        let aws = getAWSSdk();
        let s3 = new aws.S3();
        let deleteParameters = {
            Bucket: bucket,
            Key: key
        }
        await s3.deleteObject(deleteParameters).promise();
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Rename Object in S3
 * @param {String} fileURL file's path, example : s3://myBucket/folder/file.txt
 * @param {String} newName file's new name, example: file.txt
 * @param {Boolean} [removeMetadata] flag to delete .metadata file.Default is true.
 */
const s3RenameFile = async (fileURL, newName, removeMetadata = true) => {
    try {
        let s3Elements = s3URLDeconstruct(fileURL);
        let copyResult = await s3CopyFile(fileURL, s3Elements.bucket, `${s3Elements.path}${newName}`);
        if (copyResult) {
            await s3DeleteFile(s3Elements.bucket, s3Elements.key);
            if (removeMetadata) {
                await s3DeleteFile(s3Elements.bucket, `${s3Elements.key}.metadata`);
            }
        }
        return copyResult;
    } catch (e) {
        return false
    }
}


/**
 * Decontruct S3 Object's URL 
 * @param {String} s3URL S3 Object's URL
 * 
 * @returns {S3Element}
 * 
 * @example
 * 
 * let url = `s3://myBucket/folder1/folder2/file.txt`
 * let s3Element = s3URLDeconstruct(url);
 * console.log(s3Element)
 * //{
 * //  bucket:"myBucket"
 * //  key:"folder1/folder2/file.txt"
 * //  path:"folder1/folder2/"
 * //  file:"file.txt"
 * //}
 * 
 */
const s3URLDeconstruct = (s3URL) => {
    let pathDecomposing = s3URL.split('/');
    let bucket = pathDecomposing[2];
    let file = pathDecomposing.pop();
    pathDecomposing.splice(0, 3);
    let path = pathDecomposing.join('/');

    return {
        bucket: bucket,
        key: `${path}/${file}`,
        path: `${path}/`,
        file: file
    }
}

module.exports = { s3URLDeconstruct, s3RenameFile, s3DeleteFile, s3CopyFile }