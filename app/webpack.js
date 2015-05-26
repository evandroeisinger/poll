var webpack = require("webpack");

module.exports = {
  context: __dirname + '/scripts',
  entry: {
    poll: './poll.js',
    dashboard: './dashboard.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
    
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      } 
    })
  ]
};
