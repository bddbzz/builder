const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();
const config = {
  output: {
    path: path.join(projectRoot, './dist'),
    filename: '[name]_[chunkhash:8].js',
    publicPath: '',
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  mode: 'production',
  devtool: 'cheap-source-map',
  stats: 'errors-only',
  optimization: {
    /* splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    test: /(react|react\-dom)/,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 1
                }
            }
        } */
  },
};

module.exports = webpackMerge(baseConfig, config);
