/* jshint strict: false */
/**
 * Validates Javascript, in case I didn't do something nicely.
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3.0
 */

module.exports = function(grunt) {

    var files = [
        './Gruntfile.js',
        './js/*.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // JS Linter
        jshint: {
            files: files,
            options: {
                jshintrc: './.jshintrc'
            }
        },

        // JS Linter
        jscs: {
            files: files,
            options: {
                config: './.jscsrc',
                esnext: true
            }
        },

        // Watch config
        watch: {
            js: {
                files: files,
                tasks: ['test'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    // Load all used tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jscs');

    // Verifies JS is valid and standards are honored
    grunt.registerTask(
        'test',
        'Tests Javascript for operation and code standards',
        [
            'jshint',
            'jscs'
        ]
    );

    grunt.registerTask(
        'default',
        'test'
    );
};
