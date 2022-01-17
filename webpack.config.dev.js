const PATH = require("path");
const DOTENV = require("dotenv-webpack");
const HTML_WEBPACK_PLUGIN = require("html-webpack-plugin");
const MINI_CSS_EXTRACT_PLUGIN = require("mini-css-extract-plugin").default;
const COPY_PLUGIN = require("copy-webpack-plugin");
const CSS_MINIMIZER_PLUGIN = require("css-minimizer-webpack-plugin");
const TERSER_PLUGIN = require("terser-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: PATH.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": PATH.resolve(__dirname, "src/utils/"),
      "@templates": PATH.resolve(__dirname, "src/templates/"),
      "@styles": PATH.resolve(__dirname, "src/styles/"),
      "@images": PATH.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MINI_CSS_EXTRACT_PLUGIN.loader, "css-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts",
            publicPath: "./assets/fonts",
            esModule: false,
          },
        },
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HTML_WEBPACK_PLUGIN({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MINI_CSS_EXTRACT_PLUGIN({
      filename: "assets/[name].[contenthash].css",
    }),
    new COPY_PLUGIN({
      patterns: [
        {
          from: PATH.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new DOTENV(),
  ],
};
