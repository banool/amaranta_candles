import { getScentsSuccess, getScentSuccess, Scent } from "../store/scentsSlice";

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
