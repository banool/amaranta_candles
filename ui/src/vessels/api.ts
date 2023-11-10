import { apiBase } from "../common/store";
import { getVesselsSuccess, getVesselSuccess } from "./slice";
import { Vessel, StagingVessel } from "./types";

export function fetchVessels() {
  return async dispatch => {
    try {
      const response = await fetch(`${apiBase}/vessel?recursive=true`);
      const data = await response.json();

      const vessels: Vessel[] = data;

      dispatch(getVesselsSuccess({ vessels }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function fetchVessel(id: number) {
  return async dispatch => {
    try {
      const response = await fetch(`${apiBase}/vessel/${id}?recursive=true`);
      const data = await response.json();

      const vessel: Vessel = data;

      dispatch(getVesselSuccess({ vessel }));
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing", error);
    }
  };
}

export function createVessel(vessel: StagingVessel) {
  return async dispatch => {
    try {
      const response = await fetch("${apiBase}/vessel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(vessel)
      });

      const data = await response.json();
      console.log("CreateVessel response", data);
      dispatch(fetchVessels());
    } catch (error) {
      // TODO: dispatch failure.
      console.error("failed the thing");
    }
  };
}
