const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader'
        ]
      })
    },
    {
      test: /\.(jpg|png|svg)$/,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]'
      },
    },
    {
      test: /\.(eot|svg|ttf|woff(2)?)$/,
      loader: 'file-loader',
      options: {
        name: 'css/fonts/[name].[ext]'
      }
    },
    {
      test: /\.vue$/,
      use: 'vue-loader'
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/mystyles.css'),
    new VueLoaderPlugin()
  ]
};

