import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import del from "del";
import bro from "gulp-bro";
import babelify from "babelify";

const sass = gulpSass(dartSass);

function styles() {
  return gulp
    .src("assets/styles/**/*.scss")
    .pipe(sass())
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(csso())
    .pipe(gulp.dest("src/static/styles"));
}

function js() {
  return gulp
    .src("assets/js/main.js")
    .pipe(
      bro({
        transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
      })
    )
    .pipe(gulp.dest("src/static/js"));
}

async function clean() {
  return del(["src/static"]);
}

function watchBuild() {
  gulp.watch("assets/styles/**/*.scss", styles);
  gulp.watch("assets/js/*.js", js);
}

const dev = gulp.series(clean, styles, js, watchBuild);

export default dev;
