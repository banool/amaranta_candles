import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { ScentCombo } from "./types";

import { fetchScentCombo } from "./api";
import { scentComboSelector } from "./slice";

import { ScentRoute, pathFor } from "../common/routes";

type ScentComboPageProps = {};
const ScentComboPage = ({}: ScentComboPageProps) => {
  const { id } = useParams();
  // TODO: Something if we fail this.
  const numberId: number = Number(id);
  const dispatch = useDispatch();
  const scentCombo: ScentCombo | undefined = useSelector(scentComboSelector(numberId));

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
        {scentCombo.scents.map(scent => (
          <Link to={pathFor(ScentRoute, { id: scent.id })}>{scent.name}</Link>
        ))}
      </>
    );
  };

  return <div>{renderScentCombo()}</div>;
};

export default ScentComboPage;
