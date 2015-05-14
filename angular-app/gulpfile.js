var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var child_process = require('child_process');

var paths = {
  sass: ['./sass/**/*.sass', './sass/**/*.scss'],
  js: ['./www/js/**/*.js'],
  dist: ['./www/**/*']
};

var e2eUrl = 'http://localhost:8080';

gulp.task('livereload', ['sass', 'index', 'serve:live', 'watch']);

gulp.task('index', function (done) {
  gulp.src('./www/index.html')
    .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'))
    .on('end', done);
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('serve:live', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
  gulp.watch(paths.dist, ['files-changed']);
});

gulp.task('serve', ['sass', 'index'], function() {
  connect.server({
    root: 'www'
  });
});

gulp.task('e2e', function(done) {
  connect.server({
    root: 'www'
  });

  var args = ["test/protractor.config.js", "--baseUrl", e2eUrl];
  var ext = /^win/.test(process.platform) ? '.cmd' : '';
  child_process.spawn('protractor' + ext, args, {
      stdio: 'inherit'
  }).on('error', function(e) {
    connect.serverClose();
    throw e;
  }).once('close', function() {
    connect.serverClose();
    done();
  });
});

gulp.task('files-changed', function() {
  gulp.src(paths.dist).pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['index']);
});
