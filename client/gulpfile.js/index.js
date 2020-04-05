const config = require('./config')
const { watch, series } = require('gulp')

// JS task
const js = require('./tasks/js').js(config)
js.displayName = 'js'

// Sass task
const css = require('./tasks/css').css(config)
css.displayName = 'css'

// Hello task
const hello = function (done) {
  console.log(`Groeten van ${config.voornaam}!`)
  done()
}

// Watch task
const watchFiles = () => {
  watch(config.files.sass, series(css))
  watch(config.files.js, series(js))
}

exports.default = hello
exports.js = js
exports.css = css
exports.watch = watchFiles
