import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Wax } from "./types";

import { fetchWax } from "./api";
import { waxSelector } from "./slice";

type WaxPageProps = {};
const WaxPage = ({}: WaxPageProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const wax: Wax | undefined = useSelector(waxSelector(numberId));

  useEffect(() => {
    dispatch(fetchWax(numberId));
  }, [dispatch, numberId]);

  const renderWax = () => {
    if (wax === undefined) {
      return "loading...";
    }
    return (
      <>
        <h2>{wax.name}</h2>
        <p>{wax.notes}</p>
      </>
    );
  };

  return <div>{renderWax()}</div>;
};

export default WaxPage;
