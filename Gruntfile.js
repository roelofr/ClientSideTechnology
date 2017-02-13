/* eslint-env node */
/**
 * Validates Javascript, in case I didn't do something nicely.
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3.0
 */

module.exports = function (grunt) {
  var files = {
    js: [
      'Gruntfile.js',
      'js/*.js'
    ],
    css: [
      'css/*.css'
    ],
    html: [
      '*.htm',
      '*.html'
    ]
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // CSS linter
    sasslint: {
      target: files.css
    },

    // JS Linter
    eslint: {
      files: files.js
    },

    // HTML W3C validator
    validation: {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on ' +
          'element meta.'
        ],
        generateReport: false
      },
      files: files.html
    },

    // Watch config
    watch: {
      js: {
        files: files.js,
        tasks: ['test-js'],
        options: {
          interrupt: true
        }
      },
      css: {
        files: files.css,
        tasks: ['test-css'],
        options: {
          interrupt: true
        }
      }
    }
  })

  // Load all used tasks
  grunt.loadNpmTasks('grunt-sass-lint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-w3c-html-validation')

  // Load HTML and CSS validators

  // Watch

  // Verifies JS is valid and standards are honored
  grunt.registerTask(
    'test-js',
    'Tests Javascript for operation and code standards', [
      'eslint'
    ]
  )

  // Verifies CSS is valid
  grunt.registerTask(
    'test-css',
    'Tests CSS for operation and code standards', [
      'sasslint'
    ]
  )

  // Verifies HTML is valid
  grunt.registerTask(
    'test-html',
    'Tests if HTML is W3C HTML5 spec-compliant', [
      'validation'
    ]
  )

  // Verifies all assets
  grunt.registerTask(
    'test',
    'Tests Javascript for operation and code standards', [
      'test-css',
      'test-js',
      'test-html'
    ]
  )

  grunt.registerTask(
    'default',
    'test'
  )

  // Task for Travis
  grunt.registerTask(
    'travis',
    'test'
  )
}
