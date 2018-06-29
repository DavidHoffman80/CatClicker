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
gulp.task('default', [
  'copyHTML',
  'copyIMG',
  'copyCSS',
  'copyJS'
]
);

/*
Copy the html file from the Source folder
into the dist folder
*/
gulp.task('copyHTML', function() {
  return gulp.src('Source/*.html')
    .pipe(gulp.dest('dist'));
});

/*
Copy and compress all images into the dist folder
*/
gulp.task('copyIMG', function() {
  return imagemin(['Source/images/*.{jpg,png}'], 'dist/images', {
    plugins: [
      jpegRecompress({quality: 'low', progressive: true}),
      pngquant({quality: '45-60'})
    ]
  }).then(files => {
    console.log(files.path);
  });
});

/*
Copy sass files into dist folder
add source map, autoprfix and compress
*/
gulp.task('copyCSS', function() {
  return gulp.src('Source/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

/*
Copy js files from Source folder into the dist folder
add sourcemaps to js files
concatinate the js files
minify the js files
*/
gulp.task('copyJS', function(cb) {
  let options = {
    mangle: {
      eval: true,
      keep_fnames: false
    }
  };
  pump([
    gulp.src('Source/js/**/*.js'),
    sourcemaps.init(),
    concat('main.js'),
    minify(options),
    sourcemaps.write(),
    gulp.dest('dist/js')
  ], cb);
});