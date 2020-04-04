import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { Candle } from "./types";

import { fetchCandle } from "./api";
import { candleSelector } from "./slice";

import {
  BatchRoute,
  DyeRoute,
  ScentRoute,
  ScentComboRoute,
  VesselRoute,
  WaxRoute,
  pathFor,
} from "../common/routes";

const AmountTableRow = ({ data, field, linkRoute }) => {
  return (
    <tr>
      <td>
        <Link to={pathFor(linkRoute, { id: data[field].id })}>{data[field].name}</Link>
      </td>
      <td>{data.amount}</td>
    </tr>
  );
};
const AmountTable = ({ data, field, linkRoute }) => {
  const styles = {
    amountTable: {
      border: "2px solid #333",
      width: "100%",
    },
    amountTableHead: {
      border: "2px solid #333",
      width: "50%",
    },
  };
  return (
    <table style={styles.amountTable}>
      <thead>
        <tr>
          <th style={styles.amountTableHead}>name</th>
          <th style={styles.amountTableHead}>amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <AmountTableRow key={item[field].id} data={item} field={field} linkRoute={linkRoute} />
        ))}
      </tbody>
    </table>
  );
};

type CandlePageProps = { candle: Candle };
const CandlePage = ({ candle }: CandlePageProps) => {
  console.log(candle.intended_scent_combo);
  return (
    <>
      <h2>{candle.name}</h2>
      <p>{candle.notes}</p>
      <h3>batch</h3>
      <p>
        <Link to={pathFor(BatchRoute, { id: candle.batch.id })}>{candle.batch.name}</Link>
      </p>
      <h3>dyes</h3>
      <p>
        <AmountTable data={candle.dyes_with_amounts} field={"dye"} linkRoute={DyeRoute} />
      </p>
      <h3>scent combo</h3>
      <p>
        <Link to={pathFor(ScentComboRoute, { id: candle.intended_scent_combo.id })}>
          {candle.intended_scent_combo.name}
        </Link>
      </p>
      <h3>scents</h3>
      <p>
        <AmountTable data={candle.scents_with_amounts} field={"scent"} linkRoute={ScentRoute} />
      </p>
      <h3>vessel</h3>
      <p>
        <Link to={pathFor(VesselRoute, { id: candle.vessel.id })}>{candle.vessel.name}</Link>
      </p>
      <h3>waxes</h3>
      <p>
        <AmountTable data={candle.waxes_with_amounts} field={"wax"} linkRoute={WaxRoute} />
      </p>
    </>
  );
};

type CandleContainerProps = {};
const CandleContainer = ({}: CandleContainerProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const candle: Candle | undefined = useSelector(candleSelector(numberId));

  useEffect(() => {
    dispatch(fetchCandle(numberId));
  }, [dispatch, numberId]);

  const renderCandle = () => {
    if (candle === undefined) {
      return "loading...";
    }
    return <CandlePage candle={candle} />;
  };

  return <div>{renderCandle()}</div>;
};

export default CandleContainer;
