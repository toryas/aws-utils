export class S3Element {

    public bucket: string;
    public key: string;
    public path: string;
    public file: string;

    constructor(bucket: string, key: string) {
        this.bucket = bucket;
        this.key = key;
        let parts = key.split('/');
        if (parts.length < 1) {
            throw new TypeError("Bad key format")
        } else {
            this.file = `${parts.pop()}`;
            this.path = `${parts.join('/')}/`;
        }
    }

}