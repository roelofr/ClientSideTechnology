const path = require('path')

module.exports = {
  publicDir: path.resolve(__dirname, '..', 'public'),
  files: {
    js: [
      'js/**/*.js',
      'js/*.js'
    ],
    sass: [
      'css/*.scss',
      'css/**/*.scss'
    ],
    html: [
      'index.html'
    ],
    vendor: [
      'vendor/*.js',
      'vendor/**/*.js'
    ]
  },
  fileOrder: [
    'js/*Widget.js',
    'js/game.js',
    'js/**/*.js',
    'css/body.scss',
    'css/**/*.scss'
  ],
  voornaam: 'Roelof'
}
