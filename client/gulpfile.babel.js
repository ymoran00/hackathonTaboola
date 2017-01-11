'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import del from 'del';
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
  src: 'src',
  dest: 'build'
};

const sassPaths = {
  src: `${dirs.src}/css/main.scss`,
  dest: `${dirs.dest}/css/`
};

gulp.task('sass', () => {
  return gulp.src(sassPaths.src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest));
});

const cssPaths = {
  src: `${dirs.src}/css/*.css`,
  dest: `${dirs.dest}/css/`
};

gulp.task('css', () => {
  return gulp.src(cssPaths.src)
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(cssPaths.dest));
});

const jsPaths = {
  src: `${dirs.src}/js/*.js`,
  dest: `${dirs.dest}/js/`
};

const imagesPaths = {
  src: `${dirs.src}/images/**/*`,
  dest: `${dirs.dest}/images/`
};



gulp.task('build-js', () => {
  // set up the browserify instance on a task basis
  // var b = browserify({
  //   entries: ['']
  //   debug: true
  // });
  //
  // return b.bundle()
  //   .pipe(source(jsPaths.src))
  //   .pipe(buffer())
  //   .pipe(sourcemaps.init({loadMaps: true}))
  //       // Add transformation tasks to the pipeline here.
  //       .pipe(uglify())
  //       .on('error', gutil.log)
  //   .pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest(jsPaths.dest));

  return gulp.src(jsPaths.src)
    .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('images', () => {
  return gulp.src(imagesPaths.src)
    .pipe(gulp.dest(imagesPaths.dest));
});

gulp.task('index', () => {
  return gulp.src(`${dirs.src}/index.html`)
    .pipe(gulp.dest(dirs.dest));
});

gulp.task('clean', (cb) => {
    return del(`${dirs.dest}/**/*`, cb);
});

gulp.task('deploy', () => {
  return gulp.src(`${dirs.dest}/**/*`)
    .pipe(gulp.dest('public'));
});


gulp.task('default', (cb) => {
  return runSequence(
    ['clean'],
    ['sass'],
    ['css'],
    ['build-js'],
    ['images'],
    ['index'],
    ['deploy'],
    cb);
});
