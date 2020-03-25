const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "eval-source-map",
  devServer: {
    index: "index.html",
    serveIndex: true,
    publicPath: "/static/",
    hot: true,
    proxy: {
      "/api": {
        target: "candles.amaranta.house",
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
