import { createSlice } from "@reduxjs/toolkit";

const scentsSlice = createSlice({
  name: "scents",
  initialState: {
    scents: []
  },
  reducers: {
    getScentsSuccess: (state, { payload }) => {
      const { scents } = payload;
      state.scents = scents;
    }
  }
});

export const { getScentsSuccess } = scentsSlice.actions;
export const scentsSelector = state => state.scents;
export default scentsSlice.reducer;

export function fetchScents() {
  return async dispatch => {
    try {
      const response = await fetch("/api/scent");
      const data = await response.json();
      dispatch(getScentsSuccess({ scents: data }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing");
    }
  };
}
