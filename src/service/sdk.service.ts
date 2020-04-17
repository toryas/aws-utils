import * as AWS from 'aws-sdk';
import { existsSync } from 'fs';


export function getAWSSdk() {
    let existConfigFile = existsSync('./toryas.config.js');
    if (existConfigFile) {
        let { AWS_CONFIG } = require('../../../toryas.config');
        AWS.config.update(AWS_CONFIG);
    }
    return {
        configured: existConfigFile,
        sdk: AWS
    };

}


