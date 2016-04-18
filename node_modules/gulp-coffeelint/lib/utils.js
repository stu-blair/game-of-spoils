'use strict';
var PluginError;

PluginError = require('gulp-util').PluginError;

exports.isLiterate = function(file) {
  return /\.(litcoffee|coffee\.md)$/.test(file);
};

exports.createPluginError = function(message) {
  return new PluginError('gulp-coffeelint', message);
};

exports.formatOutput = function(errorReport, opt, literate) {
  var errorCount, ref, warningCount;
  ref = errorReport.getSummary(), errorCount = ref.errorCount, warningCount = ref.warningCount;
  return {
    success: errorCount === 0,
    results: errorReport,
    errorCount: errorCount,
    warningCount: warningCount,
    opt: opt,
    literate: literate
  };
};
