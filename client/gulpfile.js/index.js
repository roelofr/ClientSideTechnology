const config = require('./config')
const { watch, series, parallel } = require('gulp')

// Sass task
const css = require('./tasks/css').css(config)
css.displayName = 'css'

// HTML task
const html = require('./tasks/html').html(config)
html.displayName = 'html'

// JS task
const js = require('./tasks/js').js(config)
js.displayName = 'js'

// Templates task
const templates = require('./tasks/templates').templates(config)
templates.displayName = 'templates'

// Vendor task
const vendor = require('./tasks/vendor').vendor(config)
vendor.displayName = 'vendor'

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
  watch(config.files.handlebars.watch, series(templates))
}

// Build job
const build = parallel(html, js, css, vendor, templates)

// Export hello as default
exports.default = series(hello, build)
exports.start = series(build, watch)

// Export parts
exports.css = css
exports.templates = templates
exports.html = html
exports.js = js
exports.vendor = vendor
exports.watch = watchFiles
