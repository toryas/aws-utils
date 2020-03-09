const AWS = require('aws-sdk');
const fs = require('fs');


const getAWSSdk = () => {
    let isConfigFile = fs.existsSync('./nogen.config.js');

    if (isConfigFile) {
        let { AWS_CONFIG } = require('../../../nogen.config');
        AWS.config.update({
            region: AWS_CONFIG.region
        });
    }

    return AWS;
}

module.exports = { getAWSSdk }

