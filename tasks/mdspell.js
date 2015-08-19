/*
 * Copyright (c) 2015 Colin Eberhardt
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var spellFile = require('markdown-spellcheck').spellFile;
var generateSummaryReport = require('markdown-spellcheck').generateSummaryReport;
var generateFileReport = require('markdown-spellcheck').generateFileReport;
var chalk = require('chalk');

module.exports = function(grunt) {

  grunt.registerMultiTask('mdspell', 'Spell check your markdown files', function() {

    var done = this.async();

    // fix very weird bug - https://github.com/chalk/chalk/issues/80
    chalk.red('foo');

    async.each(this.files, function(fileGroup, nextFileGroup) {

      // warn if any invalid source paths were provided
      var files = fileGroup.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.')
          return false;
        }
        return true;
      });

      var allErrors = [];
      files.forEach(function(filename) {
        var result = spellFile(filename);

        if (result.errors.length > 0) {
          grunt.log.write(generateFileReport(filename, result));
        }
        allErrors.push(result.errors);
      });

      grunt.log.write(generateSummaryReport(allErrors) + '\n');
      var errorCount = allErrors.map(function(e) { return e && e.length ? e.length : 0; })
                            .reduce(function(p, c) { return p + c; }, 0);
      done(errorCount === 0);
    });
  });

};
