import { combineReducers } from "redux";
import messagesReducer from "../store/messagesSlice.js";

export default combineReducers({
  messages: messagesReducer
});
