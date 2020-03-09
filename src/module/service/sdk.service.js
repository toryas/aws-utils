const AWS = require('aws-sdk');
const fs = require('fs');


const getAWSSdk = () => {
    let isConfigFile = fs.existsSync('./toryas.config.js');

    if (isConfigFile) {
        let { AWS_CONFIG } = require('../../../toryas.config');
        AWS.config.update({
            region: AWS_CONFIG.region
        });
    }

    return AWS;
}

module.exports = { getAWSSdk }

