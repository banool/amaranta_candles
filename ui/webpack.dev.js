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
      "/api": "http://192.168.86.34:6969"
    }
  },
  mode: "development"
});
