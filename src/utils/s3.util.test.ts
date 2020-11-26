import { S3Utils } from "./s3.util";
import * as fs from "fs";

jest.setTimeout(100000);
describe.skip("S3 Util Test", () => {
  let s3Util: S3Utils;
  beforeAll(() => {
    let config = { region: "us-east-1" };
    s3Util = new S3Utils(config);
  });

  test("Must be get s3 element", () => {
    let s3Url = `s3://bucket/folder1/foler2/folder3/file.txt`;
    let element = S3Utils.urlDeconstruct(s3Url);
    //console.log(element);
  });

  test("get object", async () => {
    let fileURL =
      "s3://test-app-rules/querys/6abf3a38-9948-4df1-8d1d-34df3e60bd4b.csv";
    let data = s3Util.getStream(fileURL);
    //console.log(data);
  });

  test("test uploadFile", async () => {
    fs.mkdirSync(`./tmp`);
    let file = fs.openSync(`./tmp/test.txt`, `w+`);
    for (let i = 0; i < 100000; i++) {
      fs.writeSync(file, Buffer.from(`line n° ${i + 1} from test file\n`));
    }
    fs.closeSync(file);

    await s3Util.uploadFile(
      `./tmp/test.txt`,
      `test-app-rules`,
      `upload-test/test.txt`
    );
    fs.rmdirSync(`./tmp`, { recursive: true });
  });

  test("test file Detail", async ()=>{
      const {bucket,key} = {bucket:"test-app-rules", key:"afp.py"}
      let result = await s3Util.getFileDetail(bucket,key)
  });
});
