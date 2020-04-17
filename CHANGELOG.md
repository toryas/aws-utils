# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2020-04-16

### Added
- AthenaUtils export to create a Object with utils for AWS Athena
- S3Utils export to create a Object with utils for AWS S3
- Can use utils without toryas.config.js file, send config in constructor's utils
- Support TypeScript
- Add getStream method in S3Utils, to get a stream of S3 file
- Add utils for Athena: sendQuery,query,getResult

### Changed
- All S3 an Athena utils now use by Util Object, Example: before: s3URLDeconstruct() now: new S3Util().urlDeconstruct()
- Rename all S3's utils

#### Removed
- Remove queryRunner



## [0.1.2] - 2020-03-19

### Added
- Add CHANGELOG file

### Fixed
- Fix index.js remove non-existent function.
- Fix s3Copy function from s3-utils.

