import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { ScentCombo } from "./types";

interface ScentCombosDict {
  [id: string]: ScentCombo;
}

interface ScentCombosSliceState {
  scentCombos: ScentCombosDict;
  // False until the full list has been fetched at least once, so the list
  // page can tell "still loading" from "loaded and genuinely empty".
  loaded: boolean;
}

interface GetScentCombosSuccessAction {
  scentCombos: ScentCombo[];
}

interface GetScentComboSuccessAction {
  scentCombo: ScentCombo;
}

let initialState: ScentCombosSliceState = {
  scentCombos: {},
  loaded: false
};

const scentCombosSlice = createSlice({
  name: "scentCombos",
  initialState,
  reducers: {
    getScentCombosSuccess: (state, action: PayloadAction<GetScentCombosSuccessAction>) => {
      const { scentCombos } = action.payload;
      state.scentCombos = {};
      scentCombos.forEach(scentCombo => (state.scentCombos[scentCombo.id] = scentCombo));
      state.loaded = true;
    },
    getScentComboSuccess: (state, action: PayloadAction<GetScentComboSuccessAction>) => {
      const { scentCombo } = action.payload;
      state.scentCombos[scentCombo.id] = scentCombo;
    }
  }
});

export const { getScentCombosSuccess, getScentComboSuccess } = scentCombosSlice.actions;
export const scentCombosSelector = (state: RootState): ScentCombo[] =>
  Object.values(state.scentCombos.scentCombos);
export const scentComboSelector = (id: number) => (state: RootState): ScentCombo =>
  state.scentCombos.scentCombos[id];
export const scentCombosLoadedSelector = (state: RootState): boolean =>
  state.scentCombos.loaded;

export default scentCombosSlice.reducer;
