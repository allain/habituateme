var path = require('path');
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
  }
};