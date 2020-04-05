const config = require('./config')
const { watch, series } = require('gulp')

// JS task
const js = require('./tasks/js').js(config)
js.displayName = 'js'

// Sass task
const css = require('./tasks/css').css(config)
css.displayName = 'css'

// HTML task
const html = require('./tasks/html').html(config)
html.displayName = 'html'

// Hello task
const hello = function (done) {
  console.log(`Groeten van ${config.voornaam}!`)
  done()
}

// Watch task
const watchFiles = () => {
  watch(config.files.sass, series(css))
  watch(config.files.js, series(js))
  watch(config.files.html, series(html))
}

exports.default = hello
exports.js = js
exports.css = css
exports.html = html
exports.watch = watchFiles
