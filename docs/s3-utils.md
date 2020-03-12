# S3 Utils

|Function|Description|
|---|---|
|[s3URLDeconstruct](#s3URLDeconstruct)|Decontruct S3 Object's URL|
|[s3RenameFile](#s3RenameFile)|Rename Object in S3|
|[s3DeleteFile](#s3DeleteFile)|Delete a S3 Object|
|[s3CopyFile](#s3CopyFile)|Copy a S3 Object to new destination|


<a name="s3CopyFile"></a>

## s3CopyFile

Copy a S3 Object to new destination

### Parameters
- **fileURL** `{string}` S3 Object's URL  example: s3://myBucket/folder/file.txt
- **newBucket** `{string}`  destination bucket EJ: newBucket
- **newKey** `{string}` S3 Key destination EJ: otherFolder/file.txt

### Outputs
- **{string|false}** return S3 Object's URL destination if process success. false for any error.
### Example
```javascript
import { s3CopyFile } from 'toryas-utils-aws'

let source =  "s3://myBucket/folder/file.txt"

let response = s3CopyFile(source,"newBucket","folderX/fileCopy.txt");
console.log(response); // s3://newBucket/folderX/fileCopy.txt

```


<a name="s3DeleteFile"></a>
## s3DeleteFile

Delete a S3 Object

### Parameters
- **bucket** `{string}`  S3 Bucket's name example: myBucket
-  **key** `{string}` S3 Object's key example: path/file.txt
### Outputs
- `{Boolean}` if delete are done "true" else "false"
### Example
```javascript
import {s3DeleteFile} from 'toryas-utils-aws'

let response = await s3DeleteFile('myBucket','folder/file.txt');
console.log(response) // true
```

<a name="s3RenameFile"></a>
## s3RenameFile

    Rename Object in S3

### Parameters

 -  **fileURL** `{String}` file's path, example : s3://myBucket/folder/file.txt
 -  **newName** `{String}` file's new name, example: file.txt
 -  **removeMetadata** `{Boolean}` **Optional** flag to delete .metadata file. Default value is true.

### Outputs

- Primise<String|false> Return the new S3 Object's URL, return false for any error.

### Example

```javascript

import {s3RenameFile} from 'toryas-utils-aws'

let source = "s3://myBucket/folder/file.txt"
let response = await s3RenameFile(source,"newName.txt")
console.log(response); // s3://myBucket/folder/newName.txt
```


<a name="s3URLDeconstruct"></a>
## s3URLDeconstruct

    Decontruct S3 Object's URL

### Parameters
  
  - **s3URL** `{String}` S3 Object's URL

### Outputs  
  
   - S3Element
  
### Example

```javascript 
import {s3URLDeconstruct} from 'toryas-utils-aws'

let url = `s3://myBucket/folder1/folder2/file.txt`
let s3Element = s3URLDeconstruct(url);
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
 