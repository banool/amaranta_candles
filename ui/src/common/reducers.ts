import { combineReducers } from "redux";

import scentsReducer from "../scents/slice";
import scentCombosReducer from "../scent_combos/slice";
import dyesReducer from "../dyes/slice";

const rootReducer = combineReducers({
  scents: scentsReducer,
  scentCombos: scentCombosReducer,
  dyes: dyesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
