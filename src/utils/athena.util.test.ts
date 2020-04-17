import { AthenaUtils } from './athena.util'

jest.setTimeout(100000);


describe('Unit Test for Athena Utils', () => {

    test('Testing query', async () => {
        
        let config = {region: 'us-east-1'}
        let athenaUtils = new AthenaUtils(config);

        let query = `SELECT col1,col2,col3 FROM api_test.base`
        // let query = `show tables from api_test`
        let s3output = `s3://test-app-rules/querys/`

        let params = {
            query:query,
            s3output:s3output,
            skipResult:false
        }
        let result = await athenaUtils.query(params);
        console.log(result);


    });

});