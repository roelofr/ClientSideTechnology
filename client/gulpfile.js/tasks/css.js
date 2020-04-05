
const { src, dest } = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const cleancss = require('gulp-cleancss')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')

exports.css = function ({ voornaam, files, publicDir }) {
  const { sass: sassFiles } = files
  return function () {
    console.log(`Taak css wordt uitgevoerd, ${voornaam}!`)

    return src(sassFiles)
      // convert sass to css
      .pipe(sass().on('error', sass.logError))

      // write indivdual files
      .pipe(dest('./dist/sass'))

      // merge files
      .pipe(concat('style.css'))

      // write temp files
      .pipe(dest('./dist/css'))
      .pipe(dest(`${publicDir}/css`))

      // minify and format
      .pipe(cleancss({ compatibility: 'ie8' }))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))

      // write as minified
      .pipe(rename('style.min.css'))
      .pipe(dest('./dist/css'))
      .pipe(dest(`${publicDir}/css`))
  }
}
