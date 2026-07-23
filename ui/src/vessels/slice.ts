import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../common/reducers";

import { Vessel } from "./types";

interface VesselsDict {
  [id: number]: Vessel;
}

interface VesselsSliceState {
  vessels: VesselsDict;
  // False until the full list has been fetched at least once, so the list
  // page can tell "still loading" from "loaded and genuinely empty".
  loaded: boolean;
}

interface GetVesselsSuccessAction {
  vessels: Vessel[];
}

interface GetVesselSuccessAction {
  vessel: Vessel;
}

let initialState: VesselsSliceState = {
  vessels: {},
  loaded: false
};

const vesselsSlice = createSlice({
  name: "vessels",
  initialState,
  reducers: {
    getVesselsSuccess: (state, action: PayloadAction<GetVesselsSuccessAction>) => {
      const { vessels } = action.payload;
      state.vessels = {};
      vessels.forEach(vessel => (state.vessels[vessel.id] = vessel));
      state.loaded = true;
    },
    getVesselSuccess: (state, action: PayloadAction<GetVesselSuccessAction>) => {
      const { vessel } = action.payload;
      state.vessels[vessel.id] = vessel;
    }
  }
});

export const { getVesselsSuccess, getVesselSuccess } = vesselsSlice.actions;
export const vesselsSelector = (state: RootState): Vessel[] => Object.values(state.vessels.vessels);
export const vesselSelector = (id: number) => (state: RootState): Vessel =>
  state.vessels.vessels[id];
export const vesselsLoadedSelector = (state: RootState): boolean =>
  state.vessels.loaded;

export default vesselsSlice.reducer;
