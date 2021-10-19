const parameters = require('./parameters');

const config = {
  entry: {
    app: `${parameters.appEntry}/index.js`
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: parameters.outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  
  node: { fs: 'empty' },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     maxInitialRequests: Infinity,
  //     minSize: 0,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  //           return `${packageName.replace('@', '')}`;
  //         },
  //       },
  //     }
  //   }
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'public/index.html',
  //     favicon: 'public/favicon.ico'
  //   }),
  //   new Dotenv()
  // ]
};

module.exports = config;