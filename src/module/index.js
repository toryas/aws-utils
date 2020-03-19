const { queryRunner } = require('./utils/athena.util');
const { s3CopyFile,s3DeleteFile,s3URLDeconstruct,s3RenameFile } = require('./utils/s3.util');


/**
 * Athena utils
 */
exports.queryRunner = queryRunner;

/**
 * S3 Utils
 */
exports.s3URLDeconstruct = s3URLDeconstruct; 
exports.s3CopyFile = s3CopyFile;
exports.s3DeleteFile = s3DeleteFile;
exports.s3RenameFile = s3RenameFile;
