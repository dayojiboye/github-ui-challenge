let HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  module: {
    rules: [],
  },
};
