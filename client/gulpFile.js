var gulp = require('gulp'),
	inject = require('gulp-inject'),
	connect = require('gulp-connect'),
	minifyHTML = require('gulp-minify-html'),
	stripDebug = require('gulp-strip-debug'),
	jshint = require('gulp-jshint'),
	



gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: __dirname + '/jshint-output.html'
    }));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./static/html/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function () {
    return gulp.src('src/app.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('dist'));
});

