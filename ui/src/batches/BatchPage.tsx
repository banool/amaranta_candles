import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Batch } from "./types";

import { fetchBatch } from "./api";
import { batchSelector } from "./slice";

type BatchPageProps = {};
const BatchPage = ({}: BatchPageProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const batch: Batch | undefined = useSelector(batchSelector(numberId));

  useEffect(() => {
    dispatch(fetchBatch(numberId));
  }, [dispatch, numberId]);

  const renderBatch = () => {
    if (batch === undefined) {
      return "loading...";
    }
    return (
      <>
        <h2>{batch.name}</h2>
        <p>{batch.notes}</p>
      </>
    );
  };

  return <div>{renderBatch()}</div>;
};

export default BatchPage;
