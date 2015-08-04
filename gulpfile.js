var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function() {
  console.log('Hello world.');
});


gulp.task('server', function (cb) {
  exec('node app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})