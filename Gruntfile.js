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

    nodeunit: {
      all: [
        'test/mdspell_test.js'
      ]
    },

    mdspell: {
      success: {
        files: {
          src: ['test/fixtures/noErrors.md']
        }
      },
      spellingError: {
        files: {
          src: ['test/fixtures/spellingError.md']
        }
      },
      noError: {
        options: {
          ignoreAcronyms: true,
          ignoreNumbers: true
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
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'nodeunit:all']);

};
