/* jshint strict: false */
/**
 * Validates Javascript, in case I didn't do something nicely.
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3.0
 */

module.exports = function(grunt) {

    var files = {
        js: [
            './Gruntfile.js',
            './js/*.js'
        ],
        css: [
            './css/*.css'
        ]
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        csslint: {
            options: {
                csslintrc: './.csslintrc'
            },
            normal: {
                src: files.css
            }
        },

        // JS Linter
        jshint: {
            files: files.js,
            options: {
                jshintrc: './.jshintrc'
            }
        },

        // JS Linter
        jscs: {
            files: files.js,
            options: {
                config: './.jscsrc',
                esnext: true
            }
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
    });

    // Load all used tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-jscs');

    // Watch
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Verifies JS is valid and standards are honored
    grunt.registerTask(
        'test-js',
        'Tests Javascript for operation and code standards', [
            'jshint',
            'jscs'
        ]
    );

    // Verifies CSS is valid
    grunt.registerTask(
        'test-css',
        'Tests CSS for operation and code standards', [
            'csslint'
        ]
    );

    // Verifies all assets
    grunt.registerTask(
        'test',
        'Tests Javascript for operation and code standards', [
            'test-js',
            'test-css'
        ]
    );

    grunt.registerTask(
        'default',
        'test'
    );

    // Task for Travis
    grunt.registerTask(
        'travis',
        'test'
    );
};
