const config = require('./config')

// JS task
const js = require('./tasks/js').js(config.voornaam)
js.displayName = 'js'

// Hello task
const hello = function (done) {
  console.log(`Groeten van ${config.voornaam}!`)
  done()
}

exports.default = hello
exports.js = js
