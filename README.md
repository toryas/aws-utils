# Toryas / Utils AWS

- [How to install](#install)
- [Config](#config)
- [Usage](#usage)
- [Utils List](#list)

## Utils for AWS services

This lib contains many wrapers for aws-sdk libs to work with AWS services....

To view full documentation visit [GitHub Page](https://github.com/toryas/aws-utils#README.md)

<a name="install"></a>
## Install 

for install run:

> npm install --save toryas-utils-aws

<a name="config"></a>
## Config

Exist two ways to use:

### Config File

You can create a config file named `toryas.config.js` in root of project.

You should create and export an object called `AWS_CONFIG` and use de [aws sdk config](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/configuring-the-jssdk.html)

the config file looks like : 

```javascript
const AWS_CONFIG = {
    region: 'us-east-1' // you should set the region to use
}

module.exports = { AWS_CONFIG }
```

### Pass AWS-SDK config in constructor

You can pass the aws config in constructor of util like this.

```javascript
let config = {
    region:'us-east-1'
}
let athenaUtils = new AthenaUtils(config)

```

<a name="usage"></a>
## Usage

To use the lib, you only should import the util that you need.

```javascript
const { AthenaUtils } = require('toryas-utils-aws')
or
import { AthenaUtils } from 'toryas-utils-aws'


// ...

let params = {
    query:'SELECT * FROM myTable limit 2',
    s3output:"s3://myBucket/somefolder/"
}

let athenaUtils = new AthenaUtils();
athenaUtils.query(params).then(result => {
    console.log(result);
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
})

```

<a name="list"></a>
# Utils List

- [S3Utils](./docs/s3-utils.md)
- [AthenaUtils](./docs/athena-utils.md)