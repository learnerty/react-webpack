const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlygin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,"build"),
    filename: "bundle.[hash:5].js"
  },
  devServer: {
    // contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      {test: /\.css$/,use: ['style-loader', 'postcss-loader']},
      { test: /\.less$/,use: ['style-loader', 'postcss-loader', 'less-loader']},
      { test: /\.(jpe?g|png)$/, use: "file-loader" },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'template/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlygin({
      url: 'http://localhost:3000'
    })
  ]
}
