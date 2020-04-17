"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_service_1 = require("../service/sdk.service");
const s3_util_1 = require("./s3.util");
const csv = require("csvtojson/v2");
const ResultObject_1 = require("../domain/athena/ResultObject");
const readline_1 = require("readline");
const AWS = require("aws-sdk");
const apiversion_1 = require("../config/apiversion");
class AthenaUtils {
    constructor(config = undefined) {
        this.config = config;
        let aws = sdk_service_1.getAWSSdk();
        if (!config) {
            if (aws.configured) {
                this.athenaApi = new aws.sdk.Athena({ apiVersion: apiversion_1.API_VERSION.athena });
            }
            else {
                throw new Error("No config params, create a toryas.config.js file in the root or send a config object in constructor");
            }
        }
        else {
            AWS.config.update(config);
            this.athenaApi = new AWS.Athena({ apiVersion: apiversion_1.API_VERSION.athena });
        }
    }
    /**
     * Generate a query in Athena, this method only send the query without wait the results.
     *
     * @param {JSON} params params to config query execution
     * @return Promise with Athena QueryExecutionId
     */
    sendQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryParams = {
                QueryString: params.query,
                ResultConfiguration: {
                    OutputLocation: params.s3output
                },
                QueryExecutionContext: {
                    Database: params.db || "default"
                }
            };
            if (params.workgroup) {
                queryParams.WorkGroup = params.workgroup;
            }
            try {
                let queryId = (yield this.athenaApi.startQueryExecution(queryParams).promise()).QueryExecutionId;
                if (queryId != undefined) {
                    return queryId;
                }
                else {
                    throw new Error("The query Id is undefined");
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Generate a query in Athena and wait the result of query.
     *
     * @param {JSON} params params to config query execution.
     * @return Result of query
     */
    query(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryId = yield this.sendQuery(params);
            return yield this.getResult(queryId, params.skipResult);
        });
    }
    /**
     * Check the estatus of query
     *
     * @param {string} QueryExecutionId Query execution id from  AWS Athena
     */
    checkQuery(QueryExecutionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const loop = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let response = yield this.athenaApi.getQueryExecution({ QueryExecutionId }).promise();
                        let obj = JSON.parse(JSON.stringify(response.QueryExecution));
                        if (obj.Status.State === "SUCCEEDED") {
                            resolve(obj);
                        }
                        else {
                            if (obj.Status.State === "FAILED" || obj.Status.State === "CANCELLED") {
                                reject(`The query is ${obj.Status.State}`);
                            }
                            setTimeout(() => {
                                loop();
                            }, 200);
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                loop();
            });
        });
    }
    /**
     * Get Result of query execution
     *
     * @param {string} QueryExecutionId Query execution id from  AWS Athena
     * @param {boolean} [skipResult = false] this flag indicates if you don't want show result. Default value is false.
     */
    getResult(QueryExecutionId, skipResult = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryObject = yield this.checkQuery(QueryExecutionId);
            let result = new ResultObject_1.ResultObject(queryObject.QueryExecutionId);
            result.setS3Location(queryObject.ResultConfiguration.OutputLocation);
            result.setStatementType(queryObject.StatementType);
            result.setStatistics(queryObject.Statistics);
            if (skipResult) {
                return result;
            }
            let s3Util = new s3_util_1.S3Utils(this.config);
            let stream = s3Util.getStream(queryObject.ResultConfiguration.OutputLocation);
            switch (queryObject.StatementType) {
                case `DML`:
                    let _dmlData = yield this.getDMLData(stream);
                    let data = {
                        Items: _dmlData,
                        Count: _dmlData.length
                    };
                    result.setResult(data);
                    return result;
                default:
                    let _genericData = yield this.getGenericData(stream);
                    result.setResult(_genericData);
                    return result;
            }
        });
    }
    getDMLData(stream) {
        let cleanJson = new Array();
        return new Promise(function (resolve, reject) {
            stream.pipe(csv({ ignoreEmpty: true })
                .on("data", data => {
                cleanJson.push(JSON.parse(data.toString("utf8")));
            })
                .on("finish", function () {
                resolve(cleanJson);
            }));
        });
    }
    getGenericData(stream) {
        let out = new Array();
        return new Promise((resolve, reject) => {
            readline_1.createInterface({ input: stream })
                .on('line', (line) => {
                out.push({ row: line });
            })
                .on('close', () => {
                resolve(out);
            });
        });
    }
}
exports.AthenaUtils = AthenaUtils;
