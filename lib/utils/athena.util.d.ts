import { QueryExecutionObject } from '../domain/athena/QueryObject';
import { ResultObject } from '../domain/athena/ResultObject';
export declare class AthenaUtils {
    private athenaApi;
    private config;
    constructor(config?: any);
    /**
     * Generate a query in Athena, this method only send the query without wait the results.
     *
     * @param {JSON} params params to config query execution
     * @return Promise with Athena QueryExecutionId
     */
    sendQuery(params: any): Promise<string>;
    /**
     * Generate a query in Athena and wait the result of query.
     *
     * @param {JSON} params params to config query execution.
     * @return Result of query
     */
    query(params: any): Promise<ResultObject>;
    /**
     * Check the estatus of query
     *
     * @param {string} QueryExecutionId Query execution id from  AWS Athena
     */
    checkQuery(QueryExecutionId: string): Promise<QueryExecutionObject>;
    /**
     * Get Result of query execution
     *
     * @param {string} QueryExecutionId Query execution id from  AWS Athena
     * @param {boolean} [skipResult = false] this flag indicates if you don't want show result. Default value is false.
     */
    getResult(QueryExecutionId: string, skipResult?: boolean): Promise<ResultObject>;
    private getDMLData;
    private getGenericData;
}
