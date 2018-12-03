const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  devServer: {
      contentBase: './dist'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
 module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader'
        ]
      })
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

