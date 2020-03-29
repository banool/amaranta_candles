import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { ScentCombo } from "./types";

interface ScentCombosDict {
  [id: string]: ScentCombo;
}

interface ScentCombosSliceState {
  scentCombos: ScentCombosDict;
}

interface GetScentCombosSuccessAction {
  scentCombos: ScentCombo[];
}

interface GetScentComboSuccessAction {
  scentCombo: ScentCombo;
}

let initialState: ScentCombosSliceState = {
  scentCombos: {}
};

const scentCombosSlice = createSlice({
  name: "scentCombos",
  initialState,
  reducers: {
    getScentCombosSuccess: (state, action: PayloadAction<GetScentCombosSuccessAction>) => {
      const { scentCombos } = action.payload;
      state.scentCombos = {};
      scentCombos.forEach(scentCombo => (state.scentCombos[scentCombo.id] = scentCombo));
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

export default scentCombosSlice.reducer;
