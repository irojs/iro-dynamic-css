const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const version = require('./package.json').version;

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const devserver = process.env.DEV_SERVER || false;

module.exports = {
  mode,
  context: path.resolve(__dirname, 'src'),
  entry: [
    './index.js',
    devserver ? './test.js' : false,
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: prod ? 'iro-dynamic-css.min.js' : 'iro-dynamic-css.js',
    library: 'iroDynamicCss',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    // for some reason webpack 4's umd implementation uses window as a global object
    // this means that these modules won't work in node js environments unless you manually change this
    // see https://github.com/webpack/webpack/issues/6522#issuecomment-371120689
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: [
        'iro-dynamic-css v' + version,
        'iro.js plugin to dynamically update CSS rules whenever the selected color changes',
        '2019 James Daniel',
        'Licensed under MPL 2.0',
        'github.com/jaames/iro-dynamic-css',
      ].join('\n')
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
      IS_PROD: prod,
      IS_DEV_SERVER: devserver,
    }),
    devserver ? new HtmlWebpackPlugin() : false
  ].filter(Boolean),
  devtool: 'source-map',
};