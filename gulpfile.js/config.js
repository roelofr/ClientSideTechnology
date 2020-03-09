const path = require('path')

module.exports = {
  localServerProjectPath: path.resolve(__dirname, '..', 'public'),
  files: {
    js: [
      'js/**/*.js',
      'js/*.js'
    ]
  },
  voornaam: 'Roelof'
}
