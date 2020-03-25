const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "eval-source-map",
  output: {
    publicPath: "http://localhost:8080/static/"
  },
  devServer: {
    index: "index.html",
    serveIndex: true,
    port: 8080,
    // Moved to output as per https://github.com/webpack/webpack-dev-server/issues/1385
    // publicPath: "/static/",
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
