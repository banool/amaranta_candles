import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Scent } from "../store/scentsSlice";

import { fetchScent } from "../api/scents";
import { scentSelector } from "../store/scentsSlice";

export default () => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const scent: Scent | undefined = useSelector(scentSelector(numberId));

  useEffect(() => {
    dispatch(fetchScent(numberId));
  }, [dispatch]);

  const renderScent = () => {
    if (scent === undefined) {
      return "loading...";
    }
    return <>
      <h2>{scent.name}</h2>
      <p>{scent.notes}</p>
    </>
  }

  return (
    <div>
      {renderScent()}
    </div>
  );
};
