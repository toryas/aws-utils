import { getAWSSdk } from '../service/sdk.service'
import { S3Utils } from './s3.util'
import * as csv from 'csvtojson/v2'
import { QueryExecutionObject, ResultConfiguration, Status, Statistics, QueryExecutionContext } from '../domain/athena/QueryObject';
import { ResultObject } from '../domain/athena/ResultObject';
import { Stream } from 'stream'
import { createInterface } from 'readline'
import { Athena, S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { API_VERSION } from '../config/apiversion'

export class AthenaUtils {

    private athenaApi: Athena;
    private config:any;

    constructor(config = <any>undefined) {
        this.config = config;
        let aws = getAWSSdk();
        if(!config){
            if(aws.configured){
                this.athenaApi = new aws.sdk.Athena({ apiVersion: API_VERSION.athena });
            }else{
                throw new Error("No config params, create a toryas.config.js file in the root or send a config object in constructor");
            }
        }else{
            AWS.config.update(config);
            this.athenaApi = new AWS.Athena({ apiVersion: API_VERSION.athena });
        }
    }



    /**
     * Generate a query in Athena, this method only send the query without wait the results.
     * 
     * @param {JSON} params params to config query execution
     * @return Promise with Athena QueryExecutionId
     */
    public async sendQuery(params: any): Promise<string> {

        let queryParams = <any>{
            QueryString: params.query,
            ResultConfiguration: {
                OutputLocation: params.s3output
            },
            QueryExecutionContext: {
                Database: params.db || "default"
            }
        }
        if (params.workgroup) {
            queryParams.WorkGroup = params.workgroup;
        }
        try {
            let queryId = (await this.athenaApi.startQueryExecution(queryParams).promise()).QueryExecutionId;
            if (queryId != undefined) {
                return queryId
            } else {
                throw new Error("The query Id is undefined")
            }
        } catch (e) {
            throw e
        }
    }

    /**
     * Generate a query in Athena and wait the result of query.
     * 
     * @param {JSON} params params to config query execution.
     * @return Result of query
     */
    public async query(params: any): Promise<ResultObject> {
        let queryId = await this.sendQuery(params);
        return await this.getResult(queryId, params.skipResult);
    }

    /**
     * Check the estatus of query
     * 
     * @param {string} QueryExecutionId Query execution id from  AWS Athena
     */
    public async checkQuery(QueryExecutionId: string): Promise<QueryExecutionObject> {
        return new Promise((resolve, reject) => {
            const loop = async () => {
                try {
                    let response = await this.athenaApi.getQueryExecution({ QueryExecutionId }).promise();
                    let obj = JSON.parse(JSON.stringify(response.QueryExecution)) as QueryExecutionObject
                    if (obj.Status.State === "SUCCEEDED") {
                        resolve(obj);
                    } else {
                        if (obj.Status.State === "FAILED" || obj.Status.State === "CANCELLED") {
                            reject(`The query is ${obj.Status.State}`)
                        }
                        setTimeout(() => {
                            loop();
                        }, 200);
                    }
                } catch (e) {
                    reject(e);
                }
            }
            loop();
        })
    }


    /**
     * Get Result of query execution
     * 
     * @param {string} QueryExecutionId Query execution id from  AWS Athena
     * @param {boolean} [skipResult = false] this flag indicates if you don't want show result. Default value is false.
     */
    public async getResult(QueryExecutionId: string, skipResult = false) {
        let queryObject = await this.checkQuery(QueryExecutionId);

        let result = new ResultObject(queryObject.QueryExecutionId);
        result.setS3Location(queryObject.ResultConfiguration.OutputLocation);
        result.setStatementType(queryObject.StatementType);
        result.setStatistics(queryObject.Statistics)

        if (skipResult) {
            return result;
        }

        let s3Util = new S3Utils(this.config);
        let stream = s3Util.getStream(queryObject.ResultConfiguration.OutputLocation);
        switch (queryObject.StatementType) {

            case `DML`:
                let _dmlData = await this.getDMLData(stream);
                let data = {
                    Items: _dmlData,
                    Count: _dmlData.length
                }
                result.setResult(data);
                return result;
            default:
                let _genericData = await this.getGenericData(stream);
                result.setResult(_genericData)
                return result;
        }
    }

    private getDMLData(stream: Stream): Promise<Array<any>> {
        let cleanJson = new Array<any>();
        return new Promise(function (resolve, reject) {
            stream.pipe(
                csv({ ignoreEmpty: true })
                    .on("data", data => {
                        cleanJson.push(JSON.parse(data.toString("utf8")));
                    })
                    .on("finish", function () {
                        resolve(cleanJson);
                    })
            );
        });
    }

    private getGenericData(stream: any): Promise<Array<any>> {
        let out = new Array<any>();
        return new Promise((resolve, reject) => {
            createInterface({ input: stream })
                .on('line', (line) => {
                    out.push({ row: line });
                })
                .on('close', () => {
                    resolve(out);
                })

        })

    }

}