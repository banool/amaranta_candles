import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ScentCombo } from "./types";

import { fetchScentCombo } from "./api";
import { scentComboSelector } from "./slice";

import ScentLink from "../scents/ScentLink";

export default () => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const scentCombo: ScentCombo | undefined = useSelector(
    scentComboSelector(numberId)
  );

  useEffect(() => {
    dispatch(fetchScentCombo(numberId));
  }, [dispatch, numberId]);

  const renderScentCombo = () => {
    if (scentCombo === undefined) {
      return "loading...";
    }
    return (
      <>
        <h2>{scentCombo.name}</h2>
        <p>{scentCombo.notes}</p>
        <h3>Scents</h3>
        {scentCombo.scent_ids.map(scentId => (
          <ScentLink key={scentId} scentId={scentId} />
        ))}
      </>
    );
  };

  return <div>{renderScentCombo()}</div>;
};
