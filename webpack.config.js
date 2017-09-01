// THE MASTER CONFIG FILE
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: "Le App",
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

const path = require('path');

const config = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.resolve(__dirname + "/src"),
    compress: true,
    port: 9000
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'index_bundle.js'
  },
  plugins: [HtmlWebpackPluginConfig],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = config
