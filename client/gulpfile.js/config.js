const path = require('path')

module.exports = {
  publicDir: path.resolve(__dirname, '..', 'public'),
  files: {
    js: [
      'js/**/*.js',
      'js/*.js'
    ]
  },
  fileOrder: [
    'js/*Widget.js',
    'js/game.js',
    'js/**/*.js'
  ],
  voornaam: 'Roelof'
}