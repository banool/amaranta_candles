import { getDyesSuccess, getDyeSuccess } from "./slice";
import { Dye, StagingDye } from "./types";

export function fetchDyes() {
  return async dispatch => {
    try {
      const response = await fetch(`${apiBase}/dye?recursive=true`);
      const data = await response.json();

      const dyes: Dye[] = data;

      dispatch(getDyesSuccess({ dyes }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchDye(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`${apiBase}/dye/${id}?recursive=true`);
      const data = await response.json();

      const dye: Dye = data;

      dispatch(getDyeSuccess({ dye }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createDye(dye: StagingDye) {
  return async dispatch => {
    try {
      const response = await fetch(`${apiBase}/dye`, {
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
