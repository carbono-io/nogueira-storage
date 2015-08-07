'use strict';
var exec     = require('child_process').exec;
var gulp     = require('gulp');
var istanbul = require('gulp-istanbul');
var jscs     = require('gulp-jscs');
var jshint   = require('gulp-jshint');
var mocha    = require('gulp-mocha');
var notify   = require('gulp-notify');

var JS_PATH = ['index.js',
                'gulpfile.js',
                '{lib,app,test}/**/*.{js, json}',
              ];

gulp.task('checkstyle', function () {
  gulp.src(JS_PATH)
  .pipe(jscs('.jscsrc'))
  .on('error', notify.onError({
     title: 'JSCS Error :/',
     message: 'Error: <%= error.message %>',
   }));
});

gulp.task('checkcode', function () {
  gulp.src(JS_PATH)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError({
      title: 'JSHint Error :/',
      message: 'Error: <%= error.message %>',
    }));
});

gulp.task('test', function (cb) {
  gulp.src(JS_PATH)
    // Covering files
    .pipe(istanbul({includeUntested: true}))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['./test/test.js'])
        .pipe(mocha({reporter: 'nyan', growl: 'false'}))
        .pipe(istanbul.writeReports({
          dir: './unit-test-coverage',
          reporters: [ 'text-summary', 'lcov'],
          reportOpts: { dir: './unit-test-coverage'},
        }))
        // Enforce a coverage of at least 90%
        .pipe(
          istanbul.enforceThresholds(
          { thresholds: { global: 90 } })
        )
        .on('error', function (err) {
          console.log(err.message);
        })
        .on('end', cb);
    })
    ;
});

gulp.task('gendoc', function (cb) {
  exec('./node_modules/jsdoc/jsdoc.js -c .jsdoc .',
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});

gulp.task('serve', function (cb) {
  exec('node index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', function () {
  gulp.watch(
    JS_PATH,
    ['checkstyle', 'checkcode']
  );
});

gulp.task('checkall', ['checkstyle', 'checkcode', 'test',]);

gulp.task('default', function () {
    console.log('Usage:');
    console.log('gulp checkall    - Perform checkstyle, checkcode and test');
    console.log('gulp checkstyle  - Perform checkstyle');
    console.log('gulp gendoc      - Generate documentation based on comments');
    console.log('gulp checkcode   - Evaluate code quality');
    console.log('gulp serve       - Run node index.js');
    console.log('gulp test        - Execute unit tests and coverage');
    console.log('gulp watch       - Watch file changes and perform  ' +
      'checkstyle and checkcode');
  }
);

