//Include gulp and other plug-ins
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	html2js = require('gulp-html2js'),
	es = require('event-stream'),
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
gulp.task('minify-css', function() {
  return gulp.src(buildConfig.app_files.css)
  	.pipe(stripCssComments())
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css'))
});











// Default Task
gulp.task('default', ['minify-css']);

