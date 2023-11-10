import { getScentCombosSuccess, getScentComboSuccess } from "./slice";
import { ScentCombo, StagingScentCombo } from "./types";

import { fetchScent } from "../scents/api";
import { apiBase } from "../common/store";

export function fetchScentCombos() {
  return async dispatch => {
    try {
      const response = await fetch(`${apiBase}/scent_combo?recursive=true`);
      const data = await response.json();

      const scentCombos: ScentCombo[] = data;

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
      const response = await fetch(`${apiBase}/scent_combo/${id}?recursive=true`);
      const data = await response.json();

      const scentCombo: ScentCombo = data;

      dispatch(getScentComboSuccess({ scentCombo }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createScentCombo(scentCombo: StagingScentCombo) {
  return async dispatch => {
    try {
      const response = await fetch(`${apiBase}/scent_combo`, {
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
