import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { Scent } from "./types";

interface ScentsDict {
  [id: string]: Scent;
}

interface ScentsSliceState {
  scents: ScentsDict;
}

interface GetScentsSuccessAction {
  scents: Scent[];
}

interface GetScentSuccessAction {
  scent: Scent;
}

let initialState: ScentsSliceState = {
  scents: {}
};

const scentsSlice = createSlice({
  name: "scents",
  initialState,
  reducers: {
    getScentsSuccess: (
      state,
      action: PayloadAction<GetScentsSuccessAction>
    ) => {
      const { scents } = action.payload;
      state.scents = {};
      scents.forEach(scent => (state.scents[scent.id] = scent));
    },
    getScentSuccess: (state, action: PayloadAction<GetScentSuccessAction>) => {
      const { scent } = action.payload;
      state.scents[scent.id] = scent;
    }
  }
});

export const { getScentsSuccess, getScentSuccess } = scentsSlice.actions;
export const scentsSelector = (state: RootState): Scent[] =>
  Object.values(state.scents.scents);
export const scentSelector = (id: number) => (state: RootState): Scent =>
  state.scents.scents[id];

export default scentsSlice.reducer;
