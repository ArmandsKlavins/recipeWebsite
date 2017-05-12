var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor:'./src/app/vendor.js',
    app:'./src/app/index.js'
    },
  output: {
    
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].js',
  },
  devServer: {
    contentBase: 'dist',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Recipe Website',
      template: './src/app/index.html'
    })
  ]
};