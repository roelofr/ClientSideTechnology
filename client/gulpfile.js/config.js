const path = require('path')

module.exports = {
  publicDir: path.resolve(__dirname, '..', '..', 'server/wwwroot'),
  files: {
    js: [
      'js/**/*.js',
      'js/*.js',
    ],
    sass: [
      'css/*.scss',
      'css/**/*.scss'
    ],
    html: [
      'html/index.html'
    ],
    handlebars: {
      watch: [
        'templates/**/*.hbs',
      ],
      templates: [
        'templates/**/*.hbs',
        '!templates/**/_*.hbs'
      ],
      partials: [
        'templates/**/_*.hbs'
      ]
    },
    vendor: [
      'vendor/*.js',
      'vendor/**/*.js'
    ]
  },
  fileOrder: [
    'js/*Widget.js',
    'js/game.js',
    'js/game-*.js',
    'js/**/*.js',
    'js/hooks.js',
    'css/body.scss',
    'css/**/*.scss'
  ],
  voornaam: 'Roelof'
}
