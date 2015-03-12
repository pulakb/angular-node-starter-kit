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

var cssStream,
    vendorStream,
    appStream,
    applicationTemplateStream,
    commonTemplateStream,
    opts = {
        conditionals: true,
        spare:true
    };

/** CSS
 * 1. Strip comments
 * 2. Minify files
 * 3. Concat files as 'styles.css'
 */
gulp.task('minify-css', function() {
    cssStream = gulp.src(buildConfig.app_files.css)
        .pipe(stripCssComments())
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

// Script Task - Application & Vendor
gulp.task('scripts', function () {
    // Concatenate vendor scripts
    vendorStream = gulp.src(buildConfig.vendor_files.js)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./dist/js'));


    // Concatenate AND minify app sources
    appStream = gulp.src(buildConfig.app_files.js)
        .pipe(stripDebug())
        .pipe(concat('application.js'))
        .pipe(gulp.dest('./dist/js'));
});

// AngularJS Templates to JavaScript
gulp.task('templates', function() {
    //Concatenate application templates in templates.app module
    applicationTemplateStream = gulp.src(buildConfig.app_files.atpl)
        .pipe(html2js({
            outputModuleName: 'templates.app',
            useStrict: true
        }))
        .pipe(concat('appTemplates.js'))
        .pipe(gulp.dest('./dist/templates'));

    //Concatenate common templates in templates.common module
    commonTemplateStream = gulp.src(buildConfig.app_files.ctpl)
        .pipe(html2js({
            outputModuleName: 'templates.common',
            useStrict: true
        }))
        .pipe(concat('commonTemplates.js'))
        .pipe(gulp.dest('./dist/templates'));
});

// Minify HTML
gulp.task('minify-html', function() {
    var opts = {
        conditionals: true,
        spare:true,
        comments: false
    };

    return gulp.src('./src/index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist'));
});

// Inject CSS, JS & Template files in index.html
gulp.task('inject-files', function () {
    return gulp.src('./src/index.html')
        .pipe(inject(series(cssStream)))
        .pipe(inject(series(vendorStream, appStream, applicationTemplateStream, commonTemplateStream)))
        .pipe(gulp.dest('./dist'));
});

// Watch Files For Changes
/*gulp.task('watch', function() {
 gulp.watch(buildConfig.app_files.js, ['lint', 'scripts']); // Not working properly
 gulp.watch(buildConfig.app_files.css, ['minify-css']); // working fine
 });*/

// Setting up a webserver
/*gulp.task('webserver', function() {
 connect.server({
 livereload: true,
 root: ['dist']
 });
 });*/


/*gulp.task('livereload', function() {
 gulp.src([buildConfig.app_files.css, buildConfig.app_files.js])
 .pipe(watch())
 .pipe(connect.reload());
 });*/

// Default Task
gulp.task('default', [ 'minify-css', 'lint', 'scripts', 'templates', 'inject-files' ]);