'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var scriptsPath = [
  path.join(conf.paths.src, '/lib/*.js'),
  path.join(conf.paths.src, '/app/**/*.js')
]

gulp.task('scripts', function () {
  return gulp.src(scriptsPath)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size())
});
