# Athena Utils

For this wrapper use **athena-express** you can see this lib [here](https://github.com/ghdna/athena-express)

|Function|Description|
|---|---|
|[queryRunner](#queryRunner)|Run sql query on AWS Athena and put results on a S3 bucket|

## queryRunner

Run sql query on AWS Athena and put results on a S3 bucket

### Parameters
- **s3Output** AWS S3 bucket to output Athena query results 
- **query** `{String}` Query SQL to run on Athena
- **skipResults** `{Boolean}` **Optional** indicates if get results or not, default value is true
### Outputs
 * {Promise<any>}

### Examples
```javascript
import { queryRunner } from 'toryas-utils-aws'


let query = 'SELECT * FROM myTable limit 1';
let s3Output = "s3://myBucket/somefolder/"
queryRunner.(s3Output,query).then(result => {
    console.log(result);
    /*
        {
            DataScannedInMB: 0,
            QueryCostInUSD: 0.00004768,
            EngineExecutionTimeInMillis: 3847,
            Count: 0,
            QueryExecutionId: '28f1e0cb-2931-45a3-9e90-5498f09fc063',
            S3Location: 's3://myBucket/somefolder/28f1e0cb-2931-45a3-9e90-5498f09fc063.csv'
        }
    */
})
```