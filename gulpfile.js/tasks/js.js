
const { src, dest } = require('gulp')

exports.js = function (voornaam) {
  return function () {
    console.log(`Taak js is uitgevoerd, ${voornaam}!`)

    return src('js/*.js')
      .pipe(dest('dist'))
  }
}
