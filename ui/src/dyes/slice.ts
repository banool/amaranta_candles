import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { Dye } from "./types";

interface DyesDict {
  [id: number]: Dye;
}

interface DyesSliceState {
  dyes: DyesDict;
  // False until the full list has been fetched at least once, so the list
  // page can tell "still loading" from "loaded and genuinely empty".
  loaded: boolean;
}

interface GetDyesSuccessAction {
  dyes: Dye[];
}

interface GetDyeSuccessAction {
  dye: Dye;
}

let initialState: DyesSliceState = {
  dyes: {},
  loaded: false
};

const dyesSlice = createSlice({
  name: "dyes",
  initialState,
  reducers: {
    getDyesSuccess: (state, action: PayloadAction<GetDyesSuccessAction>) => {
      const { dyes } = action.payload;
      state.dyes = {};
      dyes.forEach(dye => (state.dyes[dye.id] = dye));
      state.loaded = true;
    },
    getDyeSuccess: (state, action: PayloadAction<GetDyeSuccessAction>) => {
      const { dye } = action.payload;
      state.dyes[dye.id] = dye;
    }
  }
});

export const { getDyesSuccess, getDyeSuccess } = dyesSlice.actions;
export const dyesSelector = (state: RootState): Dye[] => Object.values(state.dyes.dyes);
export const dyeSelector = (id: number) => (state: RootState): Dye => state.dyes.dyes[id];
export const dyesLoadedSelector = (state: RootState): boolean =>
  state.dyes.loaded;

export default dyesSlice.reducer;
