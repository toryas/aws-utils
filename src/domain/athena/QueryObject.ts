export class QueryExecutionObject {

    public QueryExecutionId: string;
    public Query: string;
    public StatementType: string;
    public ResultConfiguration: ResultConfiguration;
    public QueryExecutionContext: QueryExecutionContext;
    public Status: Status;
    public Statistics: Statistics;
    public WorkGroup: string;

    constructor(
        QueryExecutionId: string,
        Query: string,
        StatementType: string,
        ResultConfiguration: ResultConfiguration,
        QueryExecutionContext: QueryExecutionContext,
        Status: Status,
        Statistics: Statistics,
        WorkGroup: string
    ) {
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

export class ResultConfiguration {
    public OutputLocation: string;
    constructor(OutputLocation: string) {
        this.OutputLocation = OutputLocation;
    }
}

export class QueryExecutionContext {
    public Database: string;
    constructor(Database: string) {
        this.Database = Database;
    }
}

export class Status {
    public State: string;
    public SubmissionDateTime: Date;
    public CompletionDateTime: Date;

    constructor(
        State: string,
        SubmissionDateTime: Date,
        CompletionDateTime: Date
    ) {
        this.State = State;
        this.SubmissionDateTime = SubmissionDateTime;
        this.CompletionDateTime = CompletionDateTime;
    }
}

export class Statistics {
    public EngineExecutionTimeInMillis: Number;
    public DataScannedInBytes: Number;
    public TotalExecutionTimeInMillis: Number;
    public QueryQueueTimeInMillis: Number;
    public ServiceProcessingTimeInMillis: Number;

    constructor(
        EngineExecutionTimeInMillis: Number,
        DataScannedInBytes: Number,
        TotalExecutionTimeInMillis: Number,
        QueryQueueTimeInMillis: Number,
        ServiceProcessingTimeInMillis: Number) {
        this.EngineExecutionTimeInMillis = EngineExecutionTimeInMillis;
        this.DataScannedInBytes = DataScannedInBytes;
        this.TotalExecutionTimeInMillis = TotalExecutionTimeInMillis;
        this.QueryQueueTimeInMillis = QueryQueueTimeInMillis;
        this.ServiceProcessingTimeInMillis = ServiceProcessingTimeInMillis;
    }
}
