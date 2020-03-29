import { getWaxesSuccess, getWaxSuccess } from "./slice";
import { Wax, StagingWax } from "./types";

export function fetchWaxes() {
  return async dispatch => {
    try {
      const response = await fetch("/api/wax?recursive=true");
      const data = await response.json();

      const waxes: Wax[] = data;

      dispatch(getWaxesSuccess({ waxes }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchWax(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`/api/wax/${id}?recursive=true`);
      const data = await response.json();

      const wax: Wax = data;

      dispatch(getWaxSuccess({ wax }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createWax(wax: StagingWax) {
  return async dispatch => {
    try {
      console.log("CreateWax request", wax);

      const response = await fetch("/api/wax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(wax)
      });

      const data = await response.json();
      console.log("CreateWax response", data);
      dispatch(fetchWaxes());
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing");
    }
  };
}
