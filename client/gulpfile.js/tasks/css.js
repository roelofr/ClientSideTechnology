
const { src, dest } = require('gulp')
const sass = require('gulp-sass');
const concat = require('gulp-concat')

exports.css = function ({ voornaam, files, publicDir }) {
  const { sass: sassFiles } = files
  return function () {
    console.log(`Taak css wordt uitgevoerd, ${voornaam}!`)

    return src(sassFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('./dist/sass'))
      .pipe(concat('style.min.css'))
      .pipe(dest('./dist/css'))
      .pipe(dest(`${publicDir}/css`))
  }
}
