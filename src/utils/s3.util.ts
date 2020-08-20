import { getAWSSdk } from "../service/sdk.service";
import { S3Element } from "../domain/S3Element";
import * as AWS from "aws-sdk";
import { API_VERSION } from "../config/apiversion";
import { readFileSync } from "fs";

export class S3Utils {
  private s3Api: AWS.S3;
  constructor(config = <any>undefined) {
    let aws = getAWSSdk();
    if (!config) {
      if (aws.configured) {
        this.s3Api = new aws.sdk.S3({ apiVersion: API_VERSION.athena });
      } else {
        throw new Error(
          "No config params, create a toryas.config.js file in the root or send a config object in constructor"
        );
      }
    } else {
      AWS.config.update(config);
      this.s3Api = new AWS.S3({ apiVersion: API_VERSION.athena });
    }
  }

  /**
   * Get S3 Object as steream
   *
   * @param fileURL S3 Object's URL  example: s3://myBucket/folder/file.txt
   */
  public getStream(fileURL: string): any {
    let s3File = S3Utils.urlDeconstruct(fileURL);
    let s3Object = this.s3Api.getObject({
      Bucket: s3File.bucket,
      Key: s3File.key,
    });
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
  public async copyFile(
    fileURL: string,
    newBucket: string,
    newKey: string
  ): Promise<string> {
    try {
      let s3Elements = S3Utils.urlDeconstruct(fileURL);
      let paramsCopy = {
        Bucket: newBucket,
        CopySource: `${s3Elements.bucket}/${s3Elements.key}`,
        Key: newKey,
      };
      let resp = await this.s3Api.copyObject(paramsCopy).promise();
      return `s3://${newBucket}/${newKey}`;
    } catch (e) {
      throw new TypeError("Error on copy file");
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
  static urlDeconstruct(S3Url: string): S3Element {
    let parts = S3Url.split("/");
    return new S3Element(parts[2], parts.slice(3).join("/"));
  }

  /**
   * Rename Object in S3
   * @param {String} fileURL file's path, example : s3://myBucket/folder/file.txt
   * @param {String} newName file's new name, example: file.txt
   */
  public async renameFile(fileURL: string, newName: any) {
    try {
      let s3Elements = S3Utils.urlDeconstruct(fileURL);
      let copyResult = await this.copyFile(
        fileURL,
        s3Elements.bucket,
        `${s3Elements.path}${newName}`
      );
      if (copyResult) {
        await this.deleteFile(s3Elements.bucket, s3Elements.key);
      }
      return copyResult;
    } catch (e) {
      throw new TypeError("Error trying rename file");
    }
  }

  /**
   * Delete a s3 Object
   * @param {string} bucket  S3 Bucket's name example: myBucket
   * @param {string} key  S3 Object's key example: path/file.txt
   * @returns {Promise<boolean>} if delete are done "true" else "false"
   */
  public async deleteFile(bucket: string, key: string): Promise<boolean> {
    try {
      let deleteParameters = {
        Bucket: bucket,
        Key: key,
      };
      await this.s3Api.deleteObject(deleteParameters).promise();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Upload file to S3
   *
   * @param filePath file path
   * @param bucket bucket name
   * @param key s3 key for file - example : path/path/file.txt
   */
  public async uploadFile(filePath: string, bucket: string, key: string) {
    let fileContent = readFileSync(filePath);
    let options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
    let params = {
      Body: fileContent,
      Bucket: bucket,
      Key: key,
    };

    return await this.s3Api.upload(params, options).promise();
  }

  /**
   * Return 
   * @param bucket S3 bucket
   * @param key S3 key
   */
  public async getFileDetail(bucket: string, key: string) {
    let params = {
      Bucket: bucket,
      Key: key,
    };
    let resp =  await this.s3Api.headObject(params).promise();
    return {
        fileSize:resp.ContentLength,
        fileSizeUnit: resp.AcceptRanges,
        ETag:resp.ETag,
        contentType:resp.ContentType
    }
  }
}
