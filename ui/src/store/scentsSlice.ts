import { createSlice } from "@reduxjs/toolkit";

export interface Scent {
  id?: number;
  name: string;
  url: string;
  notes: string;
  photo_link: string;
};

const scentsSlice = createSlice({
  name: "scents",
  initialState: {
    scents: {}
  },
  reducers: {
    getScentsSuccess: (state, { payload }) => {
      const { scents } = payload;
      state.scents = {};
      scents.forEach(scent => (state.scents[scent.id] = scent));
    },
    getScentSuccess: (state, { payload }) => {
      const { scent } = payload;
      state.scents[scent.id] = scent;
    }
  }
});

export const { getScentsSuccess, getScentSuccess } = scentsSlice.actions;
export const scentsSelector = state => Object.values(state.scents.scents);
export const scentSelector = id => state => state.scents.scents[id];
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

export function fetchScent(id) {
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

export function createScent(scent) {
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
