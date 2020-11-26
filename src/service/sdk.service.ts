import * as AWS from 'aws-sdk';
import { existsSync, readFileSync } from 'fs';


export function getAWSSdk() {
    let existConfigFile = existsSync('./toryas.config.js');
    if (existConfigFile) {
        let  _AWS_CONFIG  = readFileSync('./toryas.config.js').toString();
        let Objs = eval(_AWS_CONFIG)
        let { AWS_CONFIG } =  Objs
        AWS.config.update(AWS_CONFIG);
    }
    return {
        configured: existConfigFile,
        sdk: AWS
    };

}

export function Aws(){
    return AWS;
}

