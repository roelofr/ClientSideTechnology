
const { src, dest } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')

exports.html = function ({ voornaam, files, publicDir }) {
  const { html: htmlFiles } = files
  return function () {
    console.log(`Taak html wordt uitgevoerd, ${voornaam}!`)

    return src(htmlFiles)
      .pipe(sourcemaps.init())
      .pipe(htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      }))
      .pipe(rename((path) => {
        path.dirname += "/"
        path.basename = 'index'
        path.extname = ".html"
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(dest('./dist'))
      .pipe(dest(publicDir))
  }
}
