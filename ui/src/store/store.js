import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/reducers";

const store = configureStore({ reducer: rootReducer });

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("../reducers/reducers.js", () => {
    const newRootReducer = require("../reducers/reducers.js").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
