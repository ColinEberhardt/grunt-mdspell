/*
 * grunt-mdspell
 * https://github.com/colineberhardt/grunt-markdown-spellcheck
 *
 * Copyright (c) 2015 Colin Eberhardt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    mdspell: {
      main: {
        files: {
          src: ['test/fixtures/**/*.md']
        }
      },
      noError: {
        options: {
        },
        files: {
          src: ['test/fixtures/*.md']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
