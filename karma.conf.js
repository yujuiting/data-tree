const testWebpackFn = require('./webpack.test.js');

module.exports = function(config) {
  const testWebpackConfig = testWebpackFn(config);

  config.set({

    basePath: './',
    
    frameworks: ['jasmine'],

    plugins: [
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-mocha-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-phantomjs-launcher')
    ],

    /*
      * test results reporter to use
      *
      * possible values: 'dots', 'progress'
      * available reporters: https://npmjs.org/browse/keyword/karma-reporter
      */
    reporters: ['mocha', 'coverage'],

    browsers: ['PhantomJS'],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    files: [
      { pattern: 'spec-bundle.js', included: true, watched: false }
    ],

    exclude: [],

    preprocessors: {
      'spec-bundle.js': [ 'coverage', 'webpack', 'sourcemap' ]
    },

    webpack: testWebpackConfig,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'},
        {type: 'json', subdir: '.', file: 'coverage-final.json'}
      ]
    },

    // Webpack please don't spam the console when running in karma!
    webpackServer: {noInfo: true},

    autoWatch: false,

    autoWatchBatchDelay: 250,

    /*
      * Continuous Integration mode
      * if true, Karma captures browsers, runs the tests and exits
      */
    singleRun: true,

    /*
      * level of logging
      * possible values: config.LOG_DISABLE || config.LOG_ERROR ||
      * config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      */
    logLevel: config.LOG_INFO,

    // enable / disable colors in the output (reporters and logs)
    colors: true
  });
};