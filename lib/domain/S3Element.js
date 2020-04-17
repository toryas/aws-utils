"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class S3Element {
    constructor(bucket, key) {
        this.bucket = bucket;
        this.key = key;
        let parts = key.split('/');
        if (parts.length < 1) {
            throw new TypeError("Bad key format");
        }
        else {
            this.file = `${parts.pop()}`;
            this.path = `${parts.join('/')}/`;
        }
    }
}
exports.S3Element = S3Element;
