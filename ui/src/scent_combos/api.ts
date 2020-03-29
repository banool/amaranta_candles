import { getScentCombosSuccess, getScentComboSuccess } from "./slice";
import { ScentCombo } from "./types";

import { fetchScent } from "../scents/api";

export function fetchScentCombos() {
  return async dispatch => {
    try {
      const response = await fetch("/api/scent_combo");
      const data = await response.json();

      const scentCombos: ScentCombo[] = data;

      const allRequiredScentIds = new Set<number>();
      scentCombos.forEach(scentCombo => {
        scentCombo.scent_ids.forEach(scentId => {
          allRequiredScentIds.add(scentId);
        });
      });
      allRequiredScentIds.forEach(scentId => {
        dispatch(fetchScent(scentId));
      });
      dispatch(getScentCombosSuccess({ scentCombos }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchScentCombo(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`/api/scent_combo/${id}`);
      const data = await response.json();

      const scentCombo: ScentCombo = data;
      scentCombo.scent_ids.forEach(scentId => {
        dispatch(fetchScent(scentId));
      });
      dispatch(getScentComboSuccess({ scentCombo }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createScentCombo(scentCombo: ScentCombo) {
  return async dispatch => {
    try {
      const response = await fetch("/api/scent_combo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(scentCombo)
      });

      const data = await response.json();
      console.log("CreateScentCombo response", data);
      dispatch(fetchScentCombos());
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing");
    }
  };
}
