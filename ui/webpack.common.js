const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    library: "App",
    filename: "app.js",
    path: path.resolve(__dirname, "dist/static"),
    pathinfo: true
  },
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
    },
    extensions: [".js", ".jsx"]
  }
};
