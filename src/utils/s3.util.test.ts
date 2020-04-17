import { S3Utils } from './s3.util'


jest.setTimeout(100000);
describe.only('S3 Util Test', () => {

    let s3Util: S3Utils;
    beforeAll(() => {
        let config = { region: 'us-east-1' }
        s3Util = new S3Utils(config);
    })

    test('Must be get s3 element', () => {
        let s3Url = `s3://bucket/folder1/foler2/folder3/file.txt`
        let element = S3Utils.urlDeconstruct(s3Url);
        console.log(element);
    })

    test('get object', async () => {
        let fileURL = 's3://test-app-rules/querys/6abf3a38-9948-4df1-8d1d-34df3e60bd4b.csv'
        let data = s3Util.getStream(fileURL);
        console.log(data);

    })
});