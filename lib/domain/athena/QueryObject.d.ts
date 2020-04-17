export declare class QueryExecutionObject {
    QueryExecutionId: string;
    Query: string;
    StatementType: string;
    ResultConfiguration: ResultConfiguration;
    QueryExecutionContext: QueryExecutionContext;
    Status: Status;
    Statistics: Statistics;
    WorkGroup: string;
    constructor(QueryExecutionId: string, Query: string, StatementType: string, ResultConfiguration: ResultConfiguration, QueryExecutionContext: QueryExecutionContext, Status: Status, Statistics: Statistics, WorkGroup: string);
}
export declare class ResultConfiguration {
    OutputLocation: string;
    constructor(OutputLocation: string);
}
export declare class QueryExecutionContext {
    Database: string;
    constructor(Database: string);
}
export declare class Status {
    State: string;
    SubmissionDateTime: Date;
    CompletionDateTime: Date;
    constructor(State: string, SubmissionDateTime: Date, CompletionDateTime: Date);
}
export declare class Statistics {
    EngineExecutionTimeInMillis: Number;
    DataScannedInBytes: Number;
    TotalExecutionTimeInMillis: Number;
    QueryQueueTimeInMillis: Number;
    ServiceProcessingTimeInMillis: Number;
    constructor(EngineExecutionTimeInMillis: Number, DataScannedInBytes: Number, TotalExecutionTimeInMillis: Number, QueryQueueTimeInMillis: Number, ServiceProcessingTimeInMillis: Number);
}
