const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    contentBase: './build',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [],
  },
});
