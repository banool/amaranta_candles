import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchScentCombos } from "./api";
import { scentCombosSelector } from "./slice";

import { ScentCombo } from "./types";
import ScentComboForm from "./ScentComboForm";

import { ScentRoute, ScentComboRoute, pathFor } from "../common/routes";

type ScentComboRowProps = {
  scentCombo: ScentCombo;
};
const ScentComboRow = ({ scentCombo }: ScentComboRowProps) => {
  return (
    <tr>
      <td>
        <Link to={pathFor(ScentComboRoute, { id: scentCombo.id })}>
          {scentCombo.id}
        </Link>
      </td>
      <td>{scentCombo.name}</td>
      <td>
        {scentCombo.scents.map(scent => (
          <div key={scent.id}>
            <Link to={pathFor(ScentRoute, { id: scent.id })}>{scent.name}</Link>
          </div>
        ))}
      </td>
      <td>{scentCombo.notes}</td>
    </tr>
  );
};

type ScentCombosTableProps = {
  scentCombos: ScentCombo[];
};
const ScentCombosTable = ({ scentCombos }: ScentCombosTableProps) => {
  const styles = {
    scentCombosTable: {
      border: "2px solid #333",
      width: "100%"
    },
    scentCombosTableHead: {
      border: "2px solid #333"
    }
  };
  return (
    <table style={styles.scentCombosTable}>
      <thead>
        <tr>
          <th style={styles.scentCombosTableHead}>id</th>
          <th style={styles.scentCombosTableHead}>name</th>
          <th style={styles.scentCombosTableHead}>scents</th>
          <th style={styles.scentCombosTableHead}>notes</th>
        </tr>
      </thead>
      <tbody>
        {scentCombos.map(scentCombo => (
          <ScentComboRow scentCombo={scentCombo} key={scentCombo.id} />
        ))}
      </tbody>
    </table>
  );
};

type ScentCombosPageProps = {};
const ScentCombosPage = ({}: ScentCombosPageProps) => {
  const dispatch = useDispatch();
  const scentCombos = useSelector(scentCombosSelector);

  useEffect(() => {
    dispatch(fetchScentCombos());
  }, [dispatch]);

  const renderScentCombos = () => {
    if (scentCombos.length === 0) {
      return "No scentCombos :(";
    }

    return <ScentCombosTable scentCombos={scentCombos} />;
  };

  return (
    <div>
      <h2>ScentCombos</h2>
      {renderScentCombos()}
      <h3>Create</h3>
      <ScentComboForm />
    </div>
  );
};

export default ScentCombosPage;
