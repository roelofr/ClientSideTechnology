
const { src, dest } = require('gulp')
const order = require('gulp-order')
const concat = require('gulp-concat')
const babel = require('gulp-babel')

exports.js = function ({ voornaam, files, publicDir, fileOrder }) {
  const { js } = files
  return function () {
    console.log(`Taak js wordt uitgevoerd, ${voornaam}!`)

    return src(js)
      .pipe(order(fileOrder, { base: './' }))
      .pipe(concat('app.js'))
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(dest('./dist/js'))
      .pipe(dest(`${publicDir}/js`))
}
}
