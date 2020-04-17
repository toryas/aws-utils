"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_service_1 = require("../service/sdk.service");
const S3Element_1 = require("../domain/S3Element");
const AWS = require("aws-sdk");
const apiversion_1 = require("../config/apiversion");
class S3Utils {
    constructor(config = undefined) {
        let aws = sdk_service_1.getAWSSdk();
        if (!config) {
            if (aws.configured) {
                this.s3Api = new aws.sdk.S3({ apiVersion: apiversion_1.API_VERSION.athena });
            }
            else {
                throw new Error("No config params, create a toryas.config.js file in the root or send a config object in constructor");
            }
        }
        else {
            AWS.config.update(config);
            this.s3Api = new AWS.S3({ apiVersion: apiversion_1.API_VERSION.athena });
        }
    }
    /**
     * Get S3 Object as a steream
     *
     * @param fileURL S3 Object's URL  example: s3://myBucket/folder/file.txt
     */
    getStream(fileURL) {
        let s3File = S3Utils.urlDeconstruct(fileURL);
        let s3Object = this.s3Api.getObject({ Bucket: s3File.bucket, Key: s3File.key });
        return s3Object.createReadStream();
    }
    /**
     * Copy a S3 Object to new destination
     *
     * @param {string} fileURL S3 Object's URL  example: s3://myBucket/folder/file.txt
     * @param {string} newBucket  destination bucket EJ: myNewBucket
     * @param {string} newKey  S3 Key destination EJ: otherFolder/file.txt
     * @return {Promise<string>} return S3 Object's URL destination if process success.
     */
    copyFile(fileURL, newBucket, newKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let s3Elements = S3Utils.urlDeconstruct(fileURL);
                let paramsCopy = {
                    Bucket: newBucket,
                    CopySource: `${s3Elements.bucket}/${s3Elements.key}`,
                    Key: newKey
                };
                let resp = yield this.s3Api.copyObject(paramsCopy).promise();
                return `s3://${newBucket}/${newKey}`;
            }
            catch (e) {
                throw new TypeError("Error on copy file");
            }
        });
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
    static urlDeconstruct(S3Url) {
        let parts = S3Url.split('/');
        return new S3Element_1.S3Element(parts[2], parts.slice(3).join('/'));
    }
    /**
     * Rename Object in S3
     * @param {String} fileURL file's path, example : s3://myBucket/folder/file.txt
     * @param {String} newName file's new name, example: file.txt
     */
    renameFile(fileURL, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let s3Elements = S3Utils.urlDeconstruct(fileURL);
                let copyResult = yield this.copyFile(fileURL, s3Elements.bucket, `${s3Elements.path}${newName}`);
                if (copyResult) {
                    yield this.deleteFile(s3Elements.bucket, s3Elements.key);
                }
                return copyResult;
            }
            catch (e) {
                throw new TypeError("Error trying rename file");
            }
        });
    }
    /**
     * Delete a s3 Object
     * @param {string} bucket  S3 Bucket's name example: myBucket
     * @param {string} key  S3 Object's key example: path/file.txt
     * @returns {Promise<boolean>} if delete are done "true" else "false"
     */
    deleteFile(bucket, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let deleteParameters = {
                    Bucket: bucket,
                    Key: key
                };
                yield this.s3Api.deleteObject(deleteParameters).promise();
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.S3Utils = S3Utils;
