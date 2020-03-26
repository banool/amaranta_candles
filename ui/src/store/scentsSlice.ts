import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const DEFAULT_SCENT_ID = -1;

export interface Scent {
  id: number;
  name: string;
  url: string;
  notes: string;
  photo_link: string;
}

interface ScentsDict {
  [id: string]: Scent;
}

interface ScentsState {
  scents: ScentsDict;
}

interface GetScentsSuccessAction {
  scents: Scent[];
}

interface GetScentSuccessAction {
  scent: Scent;
}

let initialState: ScentsState = {
  scents: {}
};

const scentsSlice = createSlice({
  name: "scents",
  initialState,
  reducers: {
    getScentsSuccess: (
      state: ScentsState,
      action: PayloadAction<GetScentsSuccessAction>
    ) => {
      const { scents } = action.payload;
      state.scents = {};
      scents.forEach(scent => (state.scents[scent.id] = scent));
    },
    getScentSuccess: (
      state: ScentsState,
      action: PayloadAction<GetScentSuccessAction>
    ) => {
      const { scent } = action.payload;
      state.scents[scent.id] = scent;
    }
  }
});

export const { getScentsSuccess, getScentSuccess } = scentsSlice.actions;
export const scentsSelector = (state: ScentsState): Scent[] =>
  Object.values(state.scents.scents);
export const scentSelector = (id: number) => (state: ScentsState): Scent =>
  state.scents.scents[id];

export default scentsSlice.reducer;

export function fetchScents() {
  return async dispatch => {
    try {
      const response = await fetch("/api/scent");
      const data = await response.json();
      dispatch(getScentsSuccess({ scents: data }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchScent(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`/api/scent/${id}/`);
      const data = await response.json();
      dispatch(getScentSuccess({ scent: data }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createScent(scent: Scent) {
  return async dispatch => {
    try {
      const response = await fetch("/api/scent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(scent)
      });

      const data = await response.json();
      console.log("CreateScent response", data);
      dispatch(fetchScents());
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing");
    }
  };
}
