const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'bundle': './public/index.js'
  },

  output: {
    path: './public/built',
    filename: '[name].js'
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['es2015', 'stage-2']}
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      }, {
        test: /\.tmpl\.xml/,
        loader: 'tp-fest-loader'
      },
    ]
  },

  devtool: 'source-map',

  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ]
};
