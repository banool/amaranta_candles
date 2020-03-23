import "react-hot-loader";

import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";

import App from "./components/App.jsx";
import store from "./store/store.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
