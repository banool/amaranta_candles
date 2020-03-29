import { getBatchesSuccess, getBatchSuccess } from "./slice";
import { Batch, StagingBatch } from "./types";

export function fetchBatches() {
  return async dispatch => {
    try {
      const response = await fetch("/api/batch?recursive=true");
      const data = await response.json();

      const batches: Batch[] = data;

      dispatch(getBatchesSuccess({ batches }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchBatch(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`/api/batch/${id}?recursive=true`);
      const data = await response.json();

      const batch: Batch = data;

      dispatch(getBatchSuccess({ batch }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createBatch(batch: StagingBatch) {
  return async dispatch => {
    try {
      console.log("CreateBatch request", batch);

      const response = await fetch("/api/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(batch)
      });

      const data = await response.json();
      console.log("CreateBatch response", data);
      dispatch(fetchBatches());
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing");
    }
  };
}
