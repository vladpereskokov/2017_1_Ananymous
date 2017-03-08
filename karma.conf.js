module.exports = function(config) {
  config.set({

    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },

    preprocessors: {
      './example.test.js': 'babel'
    },

    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-babel-preprocessor'
    ],

    browsers: ['PhantomJS'],

    files: [
      'example.test.js'
    ],

    client: {
      jasmine: {
        stopOnFailure: true
      }
    },

    singleRun: true,

    port: process.env.PORT || 9000,
  }); 
};
