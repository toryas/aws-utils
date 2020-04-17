"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const fs_1 = require("fs");
function getAWSSdk() {
    let existConfigFile = fs_1.existsSync('./toryas.config.js');
    if (existConfigFile) {
        let { AWS_CONFIG } = require('../../../toryas.config');
        AWS.config.update(AWS_CONFIG);
    }
    return {
        configured: existConfigFile,
        sdk: AWS
    };
}
exports.getAWSSdk = getAWSSdk;
