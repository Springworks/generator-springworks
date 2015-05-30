'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
  var project_root = path.resolve(__dirname, '..');

  return {
    context: path.join(project_root, 'client'),

    entry: {
      login: './scripts/login.jsx'
    },

    output: {
      path: path.join(project_root, 'www', 'scripts'),
      publicPath: '/scrips/',
      filename: '[name].bundle.js',
      chunkFilename: '[id].bundle.js'
    },

    cache: !config.release,
    debug: !config.release,
    devtool: false,

    stats: {
      colors: true,
      reasons: !config.release
    },

    plugins: config.release ? [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [
      new webpack.DefinePlugin({__DEV__: true})
    ],

    module: {
      loaders: [
        { test: /\.(jsx)$/, loader: 'jsx-loader?harmony&stripTypes' }
      ]
    }
  };
};
