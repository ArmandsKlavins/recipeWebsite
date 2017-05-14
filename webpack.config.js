// Path variable
var path = require('path');
// Html page generator
var HtmlWebpackPlugin = require('html-webpack-plugin');
// Seperate css file generator
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // App entry points
  entry: {
    vendor: './src/app/vendor.ts',
    app: './src/app/index.module.ts'
  },
  // App output files
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].js'
  },
  // Local server with live reload
  devServer: {
    contentBase: 'dist',
    port: 3000
  },
  // Loaders section
  module: {
    rules: [{
      // Converts html files to strings when they are required in templates
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }]
    },
    // Converts scss to css
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
      })
    },
    {
      // Converts ts to js
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }
    ]
  },
  // Resolve section
  resolve: {
    // Instruct webpack what file extensions to use when resolving Typescript modules
    extensions: [".tsx", ".ts", ".js"]
  },
  // Plugin section
  plugins: [
    // Generates index.html page, that is based on provided template.
    // Automatically adds link, script tags pointing to generated js and css files
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      // Ordering of the scripts.
      // We need vendor script to be first so that app script can work properly
      chunksSortMode: function (chunk1, chunk2) {
        var orders = ['vendor', 'app'];
        var order1 = orders.indexOf(chunk1.names[0]);
        var order2 = orders.indexOf(chunk2.names[0]);

        return order1 - order2;
      }
    }),
    // Generates seperate css files. Without this, css will be embeded
    // in outputed js files
    new ExtractTextPlugin('./styles/[name].css'),
  ]
};