import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Vessel } from "./types";

import { fetchVessel } from "./api";
import { vesselSelector } from "./slice";

type VesselPageProps = {};
const VesselPage = ({}: VesselPageProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const vessel: Vessel | undefined = useSelector(vesselSelector(numberId));

  useEffect(() => {
    dispatch(fetchVessel(numberId));
  }, [dispatch, numberId]);

  const renderVessel = () => {
    if (vessel === undefined) {
      return "loading...";
    }
    return (
      <>
        <h2>{vessel.name}</h2>
        <p>{vessel.notes}</p>
      </>
    );
  };

  return <div>{renderVessel()}</div>;
};

export default VesselPage;
