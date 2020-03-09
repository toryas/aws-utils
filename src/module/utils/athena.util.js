const { getAWSSdk } = require('../service/sdk.service');
const { AthenaExpress } = require('athena-express');



/**
 * Run sql query on AWS Athena and put results on a S3 bucket
 * 
 * @param {String} s3Output AWS S3 bucket to output Athena query results 
 * @param {String} query Query SQL to run on Athena
 * @param {Boolean} [skipResults=true] indicates if get results or not, default value is true
 * @returns {Promise<any>}
 */
const queryRunner = (s3Output, query, skipResults = true) => {

    const athenaExpressConfig = {
        aws: getAWSSdk(),
        s3: s3Output,
        getStats: true,
        skipResults: skipResults
    };

    const queryAthena = {
        sql: query
    }

    const athenaExpress = new AthenaExpress(athenaExpressConfig);
    return athenaExpress.query(queryAthena);
}

module.exports = { queryRunner }