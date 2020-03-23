import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/reducers.js";

const store = configureStore({ reducer: rootReducer });

export default store;
