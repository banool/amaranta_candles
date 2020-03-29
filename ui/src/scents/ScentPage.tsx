import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Scent } from "./types";

import { fetchScent } from "./api";
import { scentSelector } from "./slice";

import useMarked from "../common/hooks/useMarked";

type ScentPageProps = { scent: Scent };
const ScentPage = ({ scent }: ScentPageProps) => {
  const markedNotes = useMarked(scent.notes);
  return (
    <>
      <h2>{scent.name}</h2>
      <div>{markedNotes}</div>
    </>
  );
};

type ScentContainerProps = {};
const ScentContainer = ({}: ScentContainerProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const scent: Scent | undefined = useSelector(scentSelector(numberId));

  useEffect(() => {
    dispatch(fetchScent(numberId));
  }, [dispatch, numberId]);

  const renderScent = () => {
    if (scent === undefined) {
      return "loading...";
    }

    return <ScentPage scent={scent} />;
  };

  return <div>{renderScent()}</div>;
};

export default ScentContainer;
