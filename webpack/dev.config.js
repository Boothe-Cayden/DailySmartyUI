const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');
const env = require('../env');
const proxyRules = require('../proxy/rules');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = webpackMerge(webpackCommon, {
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id]-chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          {
            loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: { outputStyle: 'expanded' },
                sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': { NODE_ENV: "'development'" }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: path.resolve(__dirname, '../static'),
    compress: true,
    hot: true,
    open: true,
    historyApiFallback: {
      index: '/index.html'
    },
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  }
});