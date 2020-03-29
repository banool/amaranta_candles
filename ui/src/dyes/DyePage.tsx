import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Dye } from "./types";

import { fetchDye } from "./api";
import { dyeSelector } from "./slice";

type DyePageProps = {};
const DyePage = ({}: DyePageProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const dye: Dye | undefined = useSelector(dyeSelector(numberId));

  useEffect(() => {
    dispatch(fetchDye(numberId));
  }, [dispatch, numberId]);

  const renderDye = () => {
    if (dye === undefined) {
      return "loading...";
    }
    return (
      <>
        <h2>{dye.name}</h2>
        <p>{dye.notes}</p>
      </>
    );
  };

  return <div>{renderDye()}</div>;
};

export default DyePage;
