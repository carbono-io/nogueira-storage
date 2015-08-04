'use strict';
var gulp    = require('gulp');
var notify  = require('gulp-notify');
var jscs    = require('gulp-jscs');
var jshint  = require('gulp-jshint');
var exec    = require('child_process').exec;

gulp.task('jscs', function() {
  gulp.src('*.js')
  .pipe(jscs())
  .pipe(notify({
    title: 'JSCS',
    message: 'JSCS Passed. Let it fly!',
  }));
});

gulp.task('lint', function() {
  gulp.src('*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'))
  .pipe(notify({
    title: 'JSHint',
    message: 'JSHint Passed. Let it fly!',
  }));
});

gulp.task('default', function() {
  console.log('Hello world.');
});

gulp.task('server', function(cb) {
  exec('node app.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});