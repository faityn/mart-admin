const parameters = require('./parameters');
const incstr = require('./incstr');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// function for creating unique className
const createUniqueIdGenerator = () => {
  const index = {};
  const generateNextId = incstr.idGenerator({
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789'
  });

  return (name) => {
    if (index[name]) {
      return index[name];
    }
    
    let nextId;

    // className should be started with Numbers
    do {
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));
    
    index[name] = generateNextId();
    
    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();
const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1);
  return `${uniqueIdGenerator(componentName)}_${uniqueIdGenerator(localName)}`
};

const config = {
  mode: 'development',
  entry: {
    app: `${parameters.appEntry}/index.js`
  },
  output: {
    filename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false,
              getLocalIdent: (context, localIdentName, localName) => {
                return generateScopedName(localName, context.resourcePath);
              },
            }
          },
          {
            loader: "sass-loader",
            options: {
              modules: true,
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/styles.[hash].css'
    }),
    new webpack.DefinePlugin({
      config: {
        projectRoot: JSON.stringify(parameters.projectRoot),
        baseUrl: JSON.stringify('http://localhost:8055'),
        oauth: {
          username: JSON.stringify('demo'),
          password: JSON.stringify('secret')
        }
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8035,
    historyApiFallback: true,
    hot: true,
    open: true
  }
};

module.exports = config;