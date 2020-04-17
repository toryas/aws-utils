"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryExecutionObject {
    constructor(QueryExecutionId, Query, StatementType, ResultConfiguration, QueryExecutionContext, Status, Statistics, WorkGroup) {
        this.QueryExecutionId = QueryExecutionId;
        this.Query = Query;
        this.StatementType = StatementType;
        this.ResultConfiguration = ResultConfiguration;
        this.QueryExecutionContext = QueryExecutionContext;
        this.Status = Status;
        this.Statistics = Statistics;
        this.WorkGroup = WorkGroup;
    }
}
exports.QueryExecutionObject = QueryExecutionObject;
class ResultConfiguration {
    constructor(OutputLocation) {
        this.OutputLocation = OutputLocation;
    }
}
exports.ResultConfiguration = ResultConfiguration;
class QueryExecutionContext {
    constructor(Database) {
        this.Database = Database;
    }
}
exports.QueryExecutionContext = QueryExecutionContext;
class Status {
    constructor(State, SubmissionDateTime, CompletionDateTime) {
        this.State = State;
        this.SubmissionDateTime = SubmissionDateTime;
        this.CompletionDateTime = CompletionDateTime;
    }
}
exports.Status = Status;
class Statistics {
    constructor(EngineExecutionTimeInMillis, DataScannedInBytes, TotalExecutionTimeInMillis, QueryQueueTimeInMillis, ServiceProcessingTimeInMillis) {
        this.EngineExecutionTimeInMillis = EngineExecutionTimeInMillis;
        this.DataScannedInBytes = DataScannedInBytes;
        this.TotalExecutionTimeInMillis = TotalExecutionTimeInMillis;
        this.QueryQueueTimeInMillis = QueryQueueTimeInMillis;
        this.ServiceProcessingTimeInMillis = ServiceProcessingTimeInMillis;
    }
}
exports.Statistics = Statistics;
