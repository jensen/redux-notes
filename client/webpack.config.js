const path = require('path');

const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

const config = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: 'js/[name]-generated.js',
    path: path.resolve(__dirname, '../build/'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/'),
      styles: path.resolve(__dirname, 'static/styles/')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'stage-0',
              'es2015',
              'react'
            ],
            plugins: ['transform-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(png|svg|woff|woff2|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'static/index.html')
    }),
    new ExtractTextWebpackPlugin('css/app-generated.css')
  ],
  devtool: ENV === 'production' ? 'nosources-source-map' : 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../build/'),
    proxy: {
      '/socket.io': 'http://localhost:3000'
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  }
};

if(ENV === 'production') {
  config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]);
}

module.exports = config;
