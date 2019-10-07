const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();
const config = {
  output: {
    path: path.join(projectRoot, './dist'),
    filename: '[name]_server.js',
    publicPath: '',
    libraryTarget: 'umd',
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
  mode: 'production',
  devtool: 'cheap-source-map',
  stats: 'errors-only',
};

module.exports = webpackMerge(baseConfig, config);
