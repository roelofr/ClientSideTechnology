
const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const order = require('gulp-order')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

exports.vendor = function ({ voornaam, files, publicDir, fileOrder }) {
  const { vendor: vendorFiles } = files
  return function () {
    console.log(`Taak vendor wordt uitgevoerd, ${voornaam}!`)

    return src(vendorFiles)
      .pipe(sourcemaps.init())
      .pipe(concat('vendor.min.js'))
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(uglify({ compress: true }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(dest('./dist/js'))
      .pipe(dest(`${publicDir}/js`))
}
}
