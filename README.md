# Toryas / AWS - Utils

## Utils for AWS services

This lib contains many wrapers for aws-sdk libs to work with AWS services....

## Install 

for install run:

> npm install --save toryas-aws-utils

## Config

To use you need create a config file named `nogen.config.js` in root of project

he config file looks like : 

```javascript
const AWS_CONFIG = {
    region: 'us-east-1' // you should set tshe region to use
}

module.exports = { AWS_CONFIG }
```

## Usage

To use the lib, you only should import the util that you need.

```javascript
const { queryRunner } = require('toryas-aws-utils')
or
import { queryRunner } from 'toryas-aws-utils'


// ...

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