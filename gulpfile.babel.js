import { src, dest, watch, series } from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";

const sass = gulpSass(dartSass);

function style() {
  return src("assets/styles/**/*.scss")
    .pipe(sass())
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(csso())
    .pipe(dest("src/static/styles"));
}

function watchBuild() {
  watch("assets/styles/**/*.scss", series(style));
}

export default watchBuild;
