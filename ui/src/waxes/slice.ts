import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { Wax } from "./types";

interface WaxesDict {
  [id: number]: Wax;
}

interface WaxesSliceState {
  waxes: WaxesDict;
}

interface GetWaxesSuccessAction {
  waxes: Wax[];
}

interface GetWaxSuccessAction {
  wax: Wax;
}

let initialState: WaxesSliceState = {
  waxes: {}
};

const waxesSlice = createSlice({
  name: "waxes",
  initialState,
  reducers: {
    getWaxesSuccess: (state, action: PayloadAction<GetWaxesSuccessAction>) => {
      const { waxes } = action.payload;
      state.waxes = {};
      waxes.forEach(wax => (state.waxes[wax.id] = wax));
    },
    getWaxSuccess: (state, action: PayloadAction<GetWaxSuccessAction>) => {
      const { wax } = action.payload;
      state.waxes[wax.id] = wax;
    }
  }
});

export const { getWaxesSuccess, getWaxSuccess } = waxesSlice.actions;
export const waxesSelector = (state: RootState): Wax[] => Object.values(state.waxes.waxes);
export const waxSelector = (id: number) => (state: RootState): Wax => state.waxes.waxes[id];

export default waxesSlice.reducer;
