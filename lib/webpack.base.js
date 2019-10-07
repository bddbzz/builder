/* eslint-disable no-console */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const HTMLWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFilePath = process.env.NODE_ENV === 'ssr' ? 'index-server' : 'index';
  const entryFiles = glob.sync(
    path.join(projectRoot, `./src/pages/*/${entryFilePath}.js`),
  );
  entryFiles.forEach((entryFile) => {
    const match = entryFile.match(
      new RegExp(`src\\/pages\\/(.*?)\\/${entryFilePath}\\.js$`),
    );
    const pageName = match && match[1];
    if (!pageName) {
      return;
    }
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HTMLWebpackPlugin({
        template: path.resolve(
          projectRoot,
          `./src/pages/${pageName}/index.html`,
        ),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: process.env.NODE_ENV !== 'ssr',
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

console.table(entry);

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'assets/[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      assets: path.resolve(projectRoot, './src/assets/'),
    },
    extensions: ['.js', '.json'],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    // new webpack.optimize.ModuleConcatenationPlugin()
    new HTMLWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
    new FriendlyErrorsWebpackPlugin(),
    function errorHandler() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.dir(stats.compilation.errors);
          process.exit(1);
        }
      });
    },
  ],
  devtool: 'cheap-source-map',
};
