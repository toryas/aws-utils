# Athena Utils

## How to use

To use this S3Utils follow this steps:

1. Configure the package, see how [here!](../README.md/#config)
2. Import module

  ```javascript
  const S3Utils = require('toryas-utils-aws')
    or
  import { AthenaUtils } from 'toryas-utils-aws'
  ```
3. Instance a S3Utils object

  ```javascript
  let AthenaUtils = new AthenaUtils();
  ```

4. Call function

  ```javascript
  let response = await athenaUtils.query(params);
  ```


## Function List

|Function|Description|
|---|---|
|[sendQuery](#sendQuery)|Generate a query in Athena, this method only send the query without wait the results.|
|[query](#query)|Generate a query in Athena and wait the result of query.|

## sendQuery

Generate a query in Athena, this method only send the query without wait the results

### Parameters
- **params** JSON with query config:
    - query `{string}` **[required]**: SQL query. 
    - s3output `{string}` ***[optional]***: S3 location to save result.
    - db `{string}` ***[optional]***: Database to use.
    - workgroup `{string}` ***[optional]***: Athena WorkGroup to use.


### Outputs
 * Promise<string> - Promise with Athena QueryExecutionId

### Examples
```javascript
import { AthenaUtils } from 'toryas-utils-aws'

let athenaUtils = new AthenaUtils();

let params = {
    query:'SELECT * FROM myTable limit 1',
    s3Output:'s3://myBucket/somefolder/'
}

let queryID = await athenaUtils.sendQuery(params);
console.log(queryID); // F6e86f07-764b-41d9-ab51-787ae5fff64e
```

## query

Generate a query in Athena, this method only send the query without wait the results

### Parameters
- **params** JSON with query config:
    - query `{string}` **[required]**: SQL query. 
    - s3output `{string}` ***[optional]***: S3 location to save result.
    - db `{string}` ***[optional]***: Database to use.
    - workgroup `{string}` ***[optional]***: Athena WorkGroup to use.
    - skipResult `{boolean}` ***[optional]***: this flag indicates if you don't want show result. Default value is false.


### Outputs
 * Promise<ResultObject> - Result of query

### Examples
```javascript
import { AthenaUtils } from 'toryas-utils-aws'

let athenaUtils = new AthenaUtils();

let params = {
    query:'SELECT * FROM myTable limit 1',
    s3Output:'s3://myBucket/somefolder/'
}

let response = await athenaUtils.query(params);
console.log(response);
/*
        ResultObject {
            QueryExecutionId: 'F6e86f07-764b-41d9-ab51-787ae5fff64e',
            S3Location: 's3://myBucket/somefolder/F6e86f07-764b-41d9-ab51-787ae5fff64e.csv',
            StatementType: 'DML',
            Statistics: {
                EngineExecutionTimeInMillis: 2091,
                DataScannedInBytes: 48,
                TotalExecutionTimeInMillis: 2315,
                QueryQueueTimeInMillis: 216,
                QueryPlanningTimeInMillis: 1337,
                ServiceProcessingTimeInMillis: 8
            },
        Result: { Items: [ [Object], [Object] ], Count: 2 }
    }
    */
```
