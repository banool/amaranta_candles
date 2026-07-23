import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Batch } from "./types";

import { fetchBatch } from "./api";
import { batchSelector } from "./slice";

import { fetchCandles } from "../candles/api";
import { candlesSelector } from "../candles/slice";
import { Candle } from "../candles/types";

import { CandleRoute, pathFor } from "../common/routes";

type BatchPageProps = {};
const BatchPage = ({}: BatchPageProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const batch: Batch | undefined = useSelector(batchSelector(numberId));

  // A candle records the batch it was made in, but a batch doesn't record its
  // candles, so we fetch the candles and keep the ones pointing back here. The
  // recursive fetch is what makes candle.batch an object with an id to compare
  // against (the plain serializer gives just the id). The dataset is frozen at
  // a few dozen candles, so filtering client-side is cheaper than a server-side
  // filter -- and there is no longer a filter backend to add one to.
  const candlesInBatch: Candle[] = useSelector(candlesSelector).filter(
    candle => candle.batch && candle.batch.id === numberId
  );

  useEffect(() => {
    dispatch(fetchBatch(numberId));
    dispatch(fetchCandles());
  }, [dispatch, numberId]);

  const renderCandles = () => {
    if (candlesInBatch.length === 0) {
      return <p>No candles were made in this batch.</p>;
    }
    return (
      <ul>
        {candlesInBatch.map(candle => (
          <li key={candle.id}>
            <Link to={pathFor(CandleRoute, { id: candle.id })}>
              {candle.name || candle.intended_scent_combo.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const renderBatch = () => {
    if (batch === undefined) {
      return "loading...";
    }
    return (
      <>
        <h2>{batch.name}</h2>
        <p>{batch.notes}</p>
        <h3>Candles in this batch</h3>
        {renderCandles()}
      </>
    );
  };

  return <div>{renderBatch()}</div>;
};

export default BatchPage;
