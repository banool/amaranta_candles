import { combineReducers } from "redux";

import scentsReducer from "../scents/slice";
import dyesReducer from "../dyes/slice";

const rootReducer = combineReducers({
  scents: scentsReducer,
  dyes: dyesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default  rootReducer
