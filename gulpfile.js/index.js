const config = require('./config')

// Hello task
const hello = function (done) {
  console.log(`Groeten van ${config.voornaam}!`)
  done()
}

exports.default = hello
