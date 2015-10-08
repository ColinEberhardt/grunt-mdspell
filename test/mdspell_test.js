'use strict';

var path = require('path'),
  exec = require('child_process').exec,
  execOptions = {
    cwd: path.join(__dirname, '..')
  };

exports.tests = {
  success: function(test) {
    exec('grunt mdspell:success', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('1 file is free from spelling errors') > -1,
        true,
        'Error free markdown files are correctly checked'
      );
      test.done();
    });
  },
  spellingError: function(test) {
    exec('grunt mdspell:spellingError', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('1 spelling error found in 1 file') > -1,
        true,
        'markdown files with errors are counted'
      );
      test.equal(
        stdout.indexOf('and the envirnment you expect') > -1,
        true,
        'the actual spelling error is identified'
      );
      test.done();
    });
  },
};
