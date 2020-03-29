import { combineReducers } from "redux";

import batchesReducer from "../batches/slice";
import scentsReducer from "../scents/slice";
import scentCombosReducer from "../scent_combos/slice";
import dyesReducer from "../dyes/slice";

const rootReducer = combineReducers({
  batches: batchesReducer,
  scents: scentsReducer,
  scentCombos: scentCombosReducer,
  dyes: dyesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
