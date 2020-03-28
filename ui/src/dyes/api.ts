import { getDyesSuccess, getDyeSuccess } from "./slice";
import { Dye } from "./types";

export function fetchDyes() {
  return async dispatch => {
    try {
      const response = await fetch("/api/dye");
      const data = await response.json();
      dispatch(getDyesSuccess({ dyes: data }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchDye(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`/api/dye/${id}`);
      const data = await response.json();
      dispatch(getDyeSuccess({ dye: data }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createDye(dye: Dye) {
  return async dispatch => {
    try {
      const response = await fetch("/api/dye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(dye)
      });

      const data = await response.json();
      console.log("CreateDye response", data);
      dispatch(fetchDyes());
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing");
    }
  };
}
