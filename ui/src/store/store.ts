import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/reducers";

const store = configureStore({ reducer: rootReducer });

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("../reducers/reducers.ts", () => {
    const newRootReducer = require("../reducers/reducers.ts").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
