import * as AWS from 'aws-sdk'
import { getAWSSdk } from '../service/sdk.service'
import { API_VERSION } from "../config/apiversion";

export class SQSUtils {
    private sqsApi: AWS.SQS;
    constructor(config = <any>undefined) {
        let aws = getAWSSdk();
        if (!config) {
            if (aws.configured) {
                this.sqsApi = new aws.sdk.SQS({ apiVersion: API_VERSION.sqs });
            } else {
                throw new Error(
                    "No config params, create a toryas.config.js file in the root or send a config object in constructor"
                );
            }
        } else {
            AWS.config.update(config);
            this.sqsApi = new AWS.SQS({ apiVersion: API_VERSION.sqs });
        }
    }

    public async simpleSendMessage(message: any, sqsUrl: string, delay: number = 0) {
        const params = {
            MessageBody: message,
            QueueUrl: sqsUrl,
            DelaySeconds: delay,
        };
        const result = await this.sqsApi.sendMessage(params).promise();
    }

    public async simpleSendBatchMessage(messages: string[], sqsUrl: string, delay: number = 0) {
        let params = {
            Entries: new Array(),
            QueueUrl: sqsUrl
        };
        for (let message of messages) {
            params.Entries.push({
                Id: `${Date.now()}-${Math.round(Math.random()*100000)}`,
                MessageBody: message,
                DelaySeconds: delay,
            })
        }
        const result = await this.sqsApi.sendMessageBatch(params).promise();
    }

    public async getMessage(sqsUrl: string) {
        let params = {
            QueueUrl: sqsUrl,
        };
        let msg = await this.sqsApi.receiveMessage(params).promise();
        if (msg.Messages && msg.Messages.length > 0) {
            return msg.Messages;
        } else {
            return false;
        }
    }

    public async deleteMessage(sqsUrl: string, ReceiptHandle: string) {
        let params = {
            QueueUrl: sqsUrl,
            ReceiptHandle
        };
        return await this.sqsApi.deleteMessage(params).promise();
    }



}