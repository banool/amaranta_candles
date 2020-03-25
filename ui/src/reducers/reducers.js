import { combineReducers } from "redux";
import scentsReducer from "../store/scentsSlice.js";

export default combineReducers({
  scents: scentsReducer
});
