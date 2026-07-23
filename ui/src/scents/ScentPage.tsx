import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Scent } from "./types";

import { fetchScent } from "./api";
import { scentSelector } from "./slice";

import useMarked from "../common/hooks/useMarked";

type ScentPageProps = { scent: Scent };
const ScentPage = ({ scent }: ScentPageProps) => {
  // useMarked is a hook (it calls useMemo), so it must be called unconditionally
  // and in the same order on every render. Calling it only when notes !== null
  // changed the hook count between scents that have notes and scents that don't,
  // which violates the Rules of Hooks and would crash this component the moment
  // the same instance re-rendered for a different scent. The null case still
  // renders nothing; "" and non-empty render the marked notes, exactly as before.
  const markedNotes = useMarked(scent.notes || "");
  return (
    <>
      <h2>{scent.name}</h2>
      {scent.notes === null ? null : <div>{markedNotes}</div>}
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
