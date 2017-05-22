// THE MASTER CONFIG FILE
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const config = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, "dist/assets"),
    compress: true,
    port: 9000
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Le App",
      filename: 'assets/main.html'
    })
  ],
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
