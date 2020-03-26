import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchScent, scentSelector } from "../store/scentsSlice";

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const scent = useSelector(scentSelector(id));

  useEffect(() => {
    dispatch(fetchScent(id));
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
