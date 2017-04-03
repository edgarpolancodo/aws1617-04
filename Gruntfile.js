'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-mocha-test');

    // Project configuration.
    grunt.initConfig({
        //Load configurations
        pkg: grunt.file.readJSON('package.json'),

        //Lint JS 
        jshint: {
            all: ['Gruntfile.js', '*.js', 'src/**/*.js', 'tests/**/*.js'], //If you want to inspect more file, you change this.
            options: {
                jshintrc: '.jshintrc'
            }
        },

        //Execute mocha tests
        mochaTest: {
            tests: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'test.results<%= grunt.template.today("yyyy-mm-dd:HH:mm:ss") %>.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
                    noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
                },
                src: ['tests/**/*.js']
            }
        },

        //IT IS RECOMENDED TO EXECUTE "grunt watch" while you are working.
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint']
            }
        },

    });

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

    //TEST TASK
    grunt.registerTask('test', ['jshint', 'mochaTest']);

    //BUILD TASK
    grunt.registerTask('build', ['test']);

    //DEVELOPMENT TASK
    grunt.registerTask('dev', ['watch']);

};