import { combineReducers } from "redux";
import scentsReducer from "../store/scentsSlice";

export default combineReducers({
  scents: scentsReducer
});
