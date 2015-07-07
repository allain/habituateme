var path = require('path');
var Webpack = require('webpack');


module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [path.resolve(__dirname, 'node_modules')]
    }]
  },
  plugins: [
    new Webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};