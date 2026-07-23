import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./reducers.ts", () => {
    const newRootReducer = require("./reducers.ts").default;
    store.replaceReducer(newRootReducer);
  });
}

// Same origin in every mode now: the archive serves this bundle and the API
// from one host (candles.dport.me), so there is no cross-origin call to make
// and the server needs no CORS headers. It used to point at
// candles-api.dport.me because the UI was hosted separately on GitHub Pages.
export const apiBase = "/api";

export default store;
