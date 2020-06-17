# S3 Utils


## How to use

To use this S3Utils follow this steps:

1. Configure the package, see how [here!](../README.md/#config)
2. Import module

  ```javascript
  const S3Utils = require('toryas-utils-aws')
    or
  import { S3Utils } from 'toryas-utils-aws'
  ```
3. Instance a S3Utils object

  ```javascript
  let s3Utils = new S3Utils();
  ```

4. Call function

  ```javascript
  let response = await s3Utils.copyFile(source,"newBucket","folderX/fileCopy.txt");
  
  ```
## Function List

|Function|Description|
|---|---|
|[urlDeconstruct](#urlDeconstruct)|Decontruct S3 Object's URL|
|[renameFile](#renameFile)|Rename Object in S3|
|[deleteFile](#deleteFile)|Delete a S3 Object|
|[copyFile](#copyFile)|Copy a S3 Object to new destination|
|[getStream](#getStream)|Get S3 Object as steream|
|[uploadFile](#uploadFile)|Upload file to S3|

## copyFile
<a name="copyFile"></a>

Copy a S3 Object to new destination

### Parameters
- **fileURL** `{string}` S3 Object's URL  example: s3://myBucket/folder/file.txt
- **newBucket** `{string}`  destination bucket EJ: newBucket
- **newKey** `{string}` S3 Key destination EJ: otherFolder/file.txt

### Outputs
- **{Promise<string>}** return S3 Object's URL destination if process success. false for any error.
### Example

```javascript
import { S3Utils } from 'toryas-utils-aws'

let s3Utils = new S3Utils();

let source =  "s3://myBucket/folder/file.txt"
let response = await s3Utils.copyFile(source,"newBucket","folderX/fileCopy.txt");
console.log(response); // s3://newBucket/folderX/fileCopy.txt

```


## deleteFile
<a name="deleteFile"></a>

Delete a S3 Object

### Parameters
- **bucket** `{string}`  S3 Bucket's name example: myBucket
-  **key** `{string}` S3 Object's key example: path/file.txt
### Outputs
- `{Promise<boolean>}` if delete are done "true" else "false"
### Example
```javascript
import {S3Utils} from 'toryas-utils-aws'

let s3Utils = new S3Utils();
let response = await s3Utils.deleteFile('myBucket','folder/file.txt');
console.log(response) // true
```

## renameFile
<a name="renameFile"></a>

    Rename Object in S3

### Parameters

 -  **fileURL** `{String}` file's path, example : s3://myBucket/folder/file.txt
 -  **newName** `{String}` file's new name, example: file.txt
 -  **removeMetadata** `{Boolean}` **Optional** flag to delete .metadata file. Default value is true.

### Outputs

- Primise<String|false> Return the new S3 Object's URL, return false for any error.

### Example

```javascript

import {S3Utils} from 'toryas-utils-aws'

let s3Utils = new S3Utils();

let source = "s3://myBucket/folder/file.txt"
let response = await s3Utils.renameFile(source,"newName.txt")
console.log(response); // s3://myBucket/folder/newName.txt
```


## urlDeconstruct
<a name="urlDeconstruct"></a>

    Decontruct S3 Object's URL.
    This is a static method, you use this, without instance the S3Utils Object.

### Parameters
  
  - **s3URL** `{String}` S3 Object's URL

### Outputs  
  
   - S3Element
  
### Example

```javascript 
import {S3Utils} from 'toryas-utils-aws'

let url = `s3://myBucket/folder1/folder2/file.txt`
let s3Element = S3Utils.uRLDeconstruct(url);
console.log(s3Element)
/*
{
  bucket:"myBucket"
  key:"folder1/folder2/file.txt"
  path:"folder1/folder2/"
  file:"file.txt"
}
*/
```
 
 ## getStream
<a name="getStream"></a>

    Get S3 Object as steream.

### Parameters
  
  - **fileURL** `{String}` S3 Object's URL  example: s3://myBucket/folder/file.txt

### Outputs  
  
   - internal.Readable
  
### Example

```javascript 
import {S3Utils} from 'toryas-utils-aws'

let s3Utils = new S3Utils();

let file = `s3://myBucket/folder1/folder2/file.txt`
let stream = s3Utils.getStream(url);

```

 ## uploadFile
<a name="uploadFile"></a>

  Upload File to S3.

#### Parameters

  - **filePath** `{String}` file Path.
  - **bucket** `{String}` bucket name to upload file.
  - **key** `{String}` key to store file in bucket, Example `folder/file.txt`

### Example

```javascript
import {S3Utils} from 'toryas-utils-aws'

let s3Utils = new S3Utils();

await s3Util.uploadFile(`./tmp/test.txt`, `test-app-rules`, `upload-test/test.txt`)
```