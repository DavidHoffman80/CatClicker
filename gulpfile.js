'use strict';

/***** Requirements *****/
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglifyEs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const pump = require('pump');
const minify = composer(uglifyEs, console);
const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');
const jpegRecompress = require('imagemin-jpeg-recompress');

// Default gulp task
/*
Copy the html file to the dist folder
Convert sass files to css and move to the dist folder
Copy the js file to the dist folder
Copy the images to the dist folder
*/
gulp.task('default', ['copyHTML', 'copyCSS', 'copyJS', 'copyIMG'], function() {
  gulp.watch('Source/*.html', ['copyHTML']);
  gulp.watch('Source/sass/*.scss', ['copyCSS']);
  gulp.watch('Source/js/*.js', ['copyJS']);
  gulp.watch('Source/images/*', ['copyIMG']);
});