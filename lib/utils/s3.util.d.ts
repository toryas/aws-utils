/// <reference types="node" />
import { S3Element } from '../domain/S3Element';
export declare class S3Utils {
    private s3Api;
    constructor(config?: any);
    /**
     * Get S3 Object as a steream
     *
     * @param fileURL S3 Object's URL  example: s3://myBucket/folder/file.txt
     */
    getStream(fileURL: string): import("stream").Readable;
    /**
     * Copy a S3 Object to new destination
     *
     * @param {string} fileURL S3 Object's URL  example: s3://myBucket/folder/file.txt
     * @param {string} newBucket  destination bucket EJ: myNewBucket
     * @param {string} newKey  S3 Key destination EJ: otherFolder/file.txt
     * @return {Promise<string>} return S3 Object's URL destination if process success.
     */
    copyFile(fileURL: string, newBucket: string, newKey: string): Promise<string>;
    /**
     * Decontruct S3 Object's URL
     * @param {String} s3URL S3 Object's URL
     *
     * @returns {S3Element}
     *
     * @example
     *
     * let url = `s3://myBucket/folder1/folder2/file.txt`
     * let s3Element = urlDeconstruct(url);
     * console.log(s3Element)
     * //S3Element {
     * //  bucket:"myBucket"
     * //  key:"folder1/folder2/file.txt"
     * //  path:"folder1/folder2/"
     * //  file:"file.txt"
     * //}
     *
     */
    static urlDeconstruct(S3Url: string): S3Element;
    /**
     * Rename Object in S3
     * @param {String} fileURL file's path, example : s3://myBucket/folder/file.txt
     * @param {String} newName file's new name, example: file.txt
     */
    renameFile(fileURL: string, newName: any): Promise<string>;
    /**
     * Delete a s3 Object
     * @param {string} bucket  S3 Bucket's name example: myBucket
     * @param {string} key  S3 Object's key example: path/file.txt
     * @returns {Promise<boolean>} if delete are done "true" else "false"
     */
    deleteFile(bucket: string, key: string): Promise<boolean>;
}
