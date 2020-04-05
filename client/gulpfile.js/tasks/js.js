
const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const order = require('gulp-order')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

exports.js = function ({ voornaam, files, publicDir, fileOrder }) {
  const { js } = files
  return function () {
    console.log(`Taak js wordt uitgevoerd, ${voornaam}!`)

    return src(js)
      .pipe(sourcemaps.init())
      .pipe(order(fileOrder, { base: './' }))
      .pipe(concat('app.min.js'))
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(uglify({ compress: true }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(dest('./dist/js'))
      .pipe(dest(`${publicDir}/js`))
}
}
