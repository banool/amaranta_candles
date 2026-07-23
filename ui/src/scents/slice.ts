import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { Scent } from "./types";

interface ScentsDict {
  [id: number]: Scent;
}

interface ScentsSliceState {
  scents: ScentsDict;
  // False until the full list has been fetched at least once, so the list
  // page can tell "still loading" from "loaded and genuinely empty".
  loaded: boolean;
}

interface GetScentsSuccessAction {
  scents: Scent[];
}

interface GetScentSuccessAction {
  scent: Scent;
}

let initialState: ScentsSliceState = {
  scents: {},
  loaded: false
};

const scentsSlice = createSlice({
  name: "scents",
  initialState,
  reducers: {
    getScentsSuccess: (state, action: PayloadAction<GetScentsSuccessAction>) => {
      const { scents } = action.payload;
      state.scents = {};
      scents.forEach(scent => (state.scents[scent.id] = scent));
      state.loaded = true;
    },
    getScentSuccess: (state, action: PayloadAction<GetScentSuccessAction>) => {
      const { scent } = action.payload;
      state.scents[scent.id] = scent;
    }
  }
});

export const { getScentsSuccess, getScentSuccess } = scentsSlice.actions;
export const scentsSelector = (state: RootState): Scent[] => Object.values(state.scents.scents);
export const scentSelector = (id: number) => (state: RootState): Scent => state.scents.scents[id];
export const scentsLoadedSelector = (state: RootState): boolean =>
  state.scents.loaded;

export default scentsSlice.reducer;
