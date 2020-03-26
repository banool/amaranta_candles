const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  devtool: "eval-source-map",
  devServer: {
    index: "dist/index.html",
    serveIndex: true,
    port: 8080,
    hot: true,
    proxy: {
      "/api": {
        target: {
          host: "candles.amaranta.house",
          port: 443,
          protocol: "https:"
        },
        secure: true,
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  mode: "development"
});
