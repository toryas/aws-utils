import { Statistics } from "./QueryObject";
export declare class ResultObject {
    QueryExecutionId: string;
    S3Location: string | undefined;
    Result: any;
    StatementType: string | undefined;
    Statistics: Statistics | undefined;
    constructor(QueryExecutionId: string);
    setS3Location(S3Location: string): void;
    getS3Location(): string | undefined;
    setStatistics(Statistics: Statistics): void;
    getStatitics(): Statistics | undefined;
    setResult(Result: any): void;
    getResult(): any;
    setStatementType(StatementType: string): void;
    getStatementType(): string | undefined;
}
