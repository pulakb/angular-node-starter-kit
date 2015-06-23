/*
*
* */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

gulp.task('js', function () {
    gulp.src(['app.js', './bin/wwww.js', './lib/**/*.js'])
        .pipe(concat('run.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'))
});

gulp.task('watchers', function() {
    gulp.watch(['lib/**/*.js', 'app.js', './bin/wwww.js'], ['js']);
});
gulp.task('default', ['js', 'watchers']);