"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResultObject {
    constructor(QueryExecutionId) {
        this.QueryExecutionId = QueryExecutionId;
    }
    setS3Location(S3Location) {
        this.S3Location = S3Location;
    }
    getS3Location() {
        return this.S3Location;
    }
    setStatistics(Statistics) {
        this.Statistics = Statistics;
    }
    getStatitics() {
        return this.Statistics;
    }
    setResult(Result) {
        this.Result = Result;
    }
    getResult() {
        return this.Result;
    }
    setStatementType(StatementType) {
        this.StatementType = StatementType;
    }
    getStatementType() {
        return this.StatementType;
    }
}
exports.ResultObject = ResultObject;
