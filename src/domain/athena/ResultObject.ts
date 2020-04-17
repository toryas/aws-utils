import { Statistics } from "./QueryObject";

export class ResultObject {
    
    public QueryExecutionId: string;
    public S3Location: string | undefined;
    public Result: any;
    public StatementType: string | undefined;
    public Statistics: Statistics | undefined;
    
    constructor(QueryExecutionId: string) {
        this.QueryExecutionId = QueryExecutionId;
    }
    
    setS3Location(S3Location:string){
        this.S3Location = S3Location;
    }

    getS3Location(){
        return this.S3Location;
    }
    
    setStatistics(Statistics: Statistics) {
        this.Statistics = Statistics;
    }

    getStatitics(){
        return this.Statistics;
    }

    setResult(Result: any) {
        this.Result = Result;
    }

    getResult() {
        return this.Result;
    }

    setStatementType(StatementType: string) {
        this.StatementType = StatementType;
    }

    getStatementType() {
        return this.StatementType;
    }
}