import { combineReducers } from "redux";
import scentsReducer from "../store/scentsSlice";

const rootReducer = combineReducers({
  scents: scentsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default  rootReducer
