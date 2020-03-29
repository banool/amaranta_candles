import { getScentsSuccess, getScentSuccess } from "./slice";
import { Scent, StagingScent } from "./types";

export function fetchScents() {
  return async dispatch => {
    try {
      const response = await fetch("/api/scent?recursive=true");
      const data = await response.json();

      const scents: Scent[] = data;

      dispatch(getScentsSuccess({ scents }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchScent(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`/api/scent/${id}?recursive=true`);
      const data = await response.json();

      const scent: Scent = data;

      dispatch(getScentSuccess({ scent }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createScent(scent: StagingScent) {
  return async dispatch => {
    try {
      const response = await fetch("/api/scent", {
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
