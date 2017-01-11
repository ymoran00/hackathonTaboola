'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import concat from 'gulp-concat';
import del from 'del';
import babelify from 'babelify';
import sourcemaps from 'gulp-sourcemaps';
import runSequenceBase from 'run-sequence';

const runSequence = runSequenceBase.use(gulp);
const AUTOPREFIXER_BROWSERS = [
            'ie >= 10',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ];
const dirs = {
  src: 'app',
  dest: 'dist'
};

const sassPaths = {
  src: `${dirs.src}/css/main.scss`,
  dest: `${dirs.dest}/css/`
};

const cssPaths = {
  src: `${dirs.src}/css/*.css`,
  dest: `${dirs.dest}/css/`
};

const resourcesPaths = {
  src: `${dirs.src}/res/*`,
  dest: `${dirs.dest}/res/`
};

const appPaths = {
  src: `${dirs.src}/css/*.css`,
  dest: `${dirs.dest}/css/`
};

gulp.task('sass', () => {
  return gulp.src(sassPaths.src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest));
});


gulp.task('css', () => {
  return gulp.src(cssPaths.src)
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(cssPaths.dest));
});

gulp.task('resources', () => {
  return gulp.src(resourcesPaths.src)
    .pipe(gulp.dest(resourcesPaths.dest));
});



gulp.task('build', () => {
  return browserify({entries: `${dirs.src}/app.jsx`, extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(dirs.dest));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/*.jsx', ['build']);
});



gulp.task('clean', (cb) => {
    return del(`${dirs.dest}/**/*`, cb);
});


gulp.task('default', (cb) => {
  return runSequence(
    ['clean'],
    ['sass'],
    ['css'],
    ['resources'],
    ['build'],
    cb);
});
