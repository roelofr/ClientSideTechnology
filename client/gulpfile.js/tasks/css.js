
const { src, dest } = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')

exports.css = function ({ voornaam, files, publicDir }) {
  const { sass: sassFiles } = files
  return function () {
    console.log(`Taak css wordt uitgevoerd, ${voornaam}!`)

    return src(sassFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('./dist/sass'))
      .pipe(concat('style.css'))
      .pipe(dest('./dist/css'))
      .pipe(dest(`${publicDir}/css`))
  }
}
