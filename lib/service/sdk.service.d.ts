import * as AWS from 'aws-sdk';
export declare function getAWSSdk(): {
    configured: boolean;
    sdk: typeof AWS;
};
