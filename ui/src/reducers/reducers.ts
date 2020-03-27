import { combineReducers } from "redux";

import scentsReducer from "../scents/slice";

const rootReducer = combineReducers({
  scents: scentsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default  rootReducer
