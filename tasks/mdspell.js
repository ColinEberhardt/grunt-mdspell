/*
 * Copyright (c) 2015 Colin Eberhardt
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var spellFile = require('markdown-spellcheck').spellFile;

module.exports = function(grunt) {

  grunt.registerMultiTask('mdspell', 'Spell check your markdown files', function() {

    async.each(this.files, function(fileGroup, nextFileGroup) {

      // warn if any invalid source paths were provided
      var files = fileGroup.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      });

      async.each(files, function(filename, nextFile) {
        var result = spellFile(filename);
        if (result.errors.length === 0) {
          grunt.log.writeln(filename, 'is error free');
        } else {
          grunt.log.writeln(filename, 'contains spelling errors', result.errors);
          grunt.fail.warn('Failed due to spelling errors');
        }
        nextFile();
      });

      nextFileGroup();
    });
  });

};
