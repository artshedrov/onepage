const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const minify = require('gulp-minify-css');
const merge = require('merge-stream');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-contrib-clean');
const browser = require('browser-sync').create();



gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff, woff2}',
      'source/img/**',
      'source/js/**',
      'source/*.html',
      'source/css/**'
  ], {
    base: 'source'
  })
      .pipe(plumber())
      .pipe(gulp.dest('build'));
});

gulp.task('clean', async function () {
    await gulp.src('build')
        .pipe(clean());
});

gulp.task('miniCss', function () {
    return gulp.src('build/css/*.css')
        .pipe(minify())
        .pipe(gulp.dest('build/css'));
});

gulp.task('watcher', function () {
  return watch('source/less/*.less', function () {
    let lessStream = gulp.src(['source/less/*.less'])
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('less-files.less'));

    return merge(lessStream)
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer]))
        //.pipe(minify())
        .pipe(gulp.dest('source/css'));
  });
});

gulp.task('build', gulp.series('clean', 'copy', 'miniCss'));



