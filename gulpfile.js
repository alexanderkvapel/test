const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 5000,
    ui: {
      port: 5001
    }
  });
}

function html() {
  return gulp.src('src/**/*.html')
             .pipe(plumber())
             .pipe(gulp.dest('dist/'))
             .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src('src/blocks/**/*.css')
             .pipe(plumber())
             .pipe(concat('bundle.css'))
             .pipe(gulp.dest('dist/'))
             .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.css')
             .pipe(gulp.dest('dist/fonts'))
             .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
             .pipe(gulp.dest('dist/images'))
             .pipe(browserSync.reload({stream: true}));
}

function videos() {
  return gulp.src('src/videos/**/*.{mp4,avi,mov,mkv,flv,webm,mpg,wmv}')
             .pipe(gulp.dest('dist/videos'))
             .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/fonts/**/*.css'], fonts);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/videos/**/*.{mp4,avi,mov,mkv,flv,webm,mpg,wmv}'], videos);
}

const build = gulp.series(clean, gulp.parallel(html, css, fonts, images, videos));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.serve = serve;
exports.clean = clean;
exports.html = html;
exports.css = css;
exports.fonts = fonts;
exports.images = images;
exports.videos = videos;

exports.build = build;
exports.watchapp = watchapp;

exports.default = watchapp;
