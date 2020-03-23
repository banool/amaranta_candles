const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    library: "App",
    filename: "app.js",
    path: path.resolve(__dirname, "dist/static"),
    pathinfo: true
  },
  devtool: "eval-source-map",
  devServer: {
    index: "index.html",
    serveIndex: true,
    publicPath: "/static/",
    hot: true
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"]
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
};
