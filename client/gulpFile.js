//Include gulp and other plug-ins
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	html2js = require('gulp-html2js'),
	series = require('stream-series'),
	inject = require('gulp-inject'),
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint'),
	karma = require('gulp-karma'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	rename = require("gulp-rename"),
	stripCssComments = require('gulp-strip-css-comments'),
	stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

/**
* Load in our build configuration file.
*/
var buildConfig = require( './build.config.js' );

// Tasks
// =====

/** CSS
* 1. Strip comments
* 2. Minify files
* 3. Concat files as 'styles.css'
*/
var cssStream;

gulp.task('minify-css', function() {
  cssStream = gulp.src(buildConfig.app_files.css)
  	.pipe(stripCssComments())
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css'));
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src(buildConfig.app_files.js)
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: buildConfig.debug_dir + '/jshint-output.html'
    }));
});

gulp.task('scripts', function () {
	// Concatenate vendor scripts 
	var vendorStream = gulp.src(buildConfig.vendor_files.js)
	  .pipe(concat('vendors.js'))
	  .pipe(gulp.dest('./dist/js'));


	// Concatenate AND minify app sources 
	var appStream = gulp.src(buildConfig.app_files.js)
	  .pipe(concat('application.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('./dist/js'));

  return gulp.src('./src/index.html')
  .pipe(inject(series(cssStream)))
  .pipe(inject(series(vendorStream, appStream)))
  .pipe(gulp.dest('./dist'));

});




// Default Task
gulp.task('default', ['minify-css', 'lint', 'scripts']);

