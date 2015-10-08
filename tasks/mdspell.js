/*
 * Copyright (c) 2015 Colin Eberhardt
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var async = require('async');
var spellFile = require('markdown-spellcheck').spellFile;
var spellcheck = require('markdown-spellcheck').spellcheck;
var generateSummaryReport = require('markdown-spellcheck').generateSummaryReport;
var generateFileReport = require('markdown-spellcheck').generateFileReport;
var spellConfig = require('markdown-spellcheck/es5/spell-config');
var chalk = require('chalk');

module.exports = function(grunt) {

  grunt.registerMultiTask('mdspell', 'Spell check your markdown files', function() {

    var done = this.async();
    var fileGroups = this.files;

    var options = this.options({
      ignoreAcronyms: false,
      ignoreNumbers: false
    });

    // fix very weird bug - https://github.com/chalk/chalk/issues/80
    chalk.red('foo');

    // load the spelling configuration file
    spellConfig.initialise.bind(spellConfig)('./.spelling',
      function() {

        // add any global words to be excluded
        spellConfig.getGlobalWords()
          .forEach(function(word) { spellcheck.addWord(word); });

        // iterate over the grunt task definitions
        async.each(fileGroups, function(fileGroup, nextFileGroup) {

          // warn if any invalid source paths were provided
          var files = fileGroup.src.filter(function(filepath) {
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            }
            return true;
          });

          // iterate over the source files
          async.mapSeries(files, function(filename, callback) {

            // add local words for exclusion
            spellConfig.getFileWords(filename)
              .forEach(function (word) { spellcheck.addWord(word, true); });

            var result = spellFile(filename, options);

            // remove the local words
            spellcheck.resetTemporaryCustomDictionary();

            if (result.errors.length > 0) {
              grunt.log.write(generateFileReport(filename, result));
            }
            callback(null, result.errors);
          }, function(e, allErrors) {
            grunt.log.write(generateSummaryReport(allErrors) + '\n');
            var errorCount = allErrors.map(function(e) { return e && e.length ? e.length : 0; })
                                  .reduce(function(p, c) { return p + c; }, 0);
            done(errorCount === 0);
          });
        });
      });
  });
};
