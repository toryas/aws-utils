const { task, src, series, dest } = require('gulp');
const clean = require('gulp-clean');
const file = require('gulp-file');
const fs = require('fs');
const pkg = require('./package.json');
const del = require('del')


task('clean', async ()=>{
    return del.sync(['dist'])
})

task('copyToDist', async () => {
    await src('./src/module/**/*').pipe(dest('./dist/'))
    await src('./README.md').pipe(dest('./dist/'))
})

task('makePackageJson', async () => {
    let distPkg = {
        dependencies: {
            "athena-express": "^5.1.1"
        },
        peerDependencies: {
            "aws-sdk": "^2.635.0"
        }
    }

    distPkg.version = pkg.version;
    distPkg.name = pkg.name;
    distPkg.description = pkg.description;
    distPkg.main = pkg.main;
    distPkg.keywords = pkg.keywords;
    distPkg.license = pkg.license;
    distPkg.bugs = pkg.bugs;
    distPkg.homepage = pkg.homepage;
    distPkg.repository = pkg.repository;

    await file('package.json', JSON.stringify(distPkg,null,2), { src: true })
    .pipe(dest('dist'));


})

task('build', series(
    'clean',
    'copyToDist',
    'makePackageJson'
)); 