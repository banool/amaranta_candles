import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchScents } from "../scents/api";
import { scentsSelector } from "../scents/slice";
import ScentForm from "../components/ScentForm";

import { ScentsRoute, pathFor } from "../common/routes";

const ScentRow = ({ scent }) => {
  return (
    <tr>
      <td>
        <Link to={pathFor(ScentsRoute, { id: scent.id })}>{scent.id}</Link>
      </td>
      <td>{scent.name}</td>
      <td>{scent.url}</td>
      <td>{scent.photo_link}</td>
      <td>{scent.notes}</td>
    </tr>
  );
};

const ScentsTable = ({ scents }) => {
  const styles = {
    scentsTable: {
      border: "2px solid #333",
      width: "100%"
    },
    scentsTableHead: {
      border: "2px solid #333"
    }
  };
  return (
    <table style={styles.scentsTable}>
      <thead>
        <tr>
          <th style={styles.scentsTableHead}>id</th>
          <th style={styles.scentsTableHead}>name</th>
          <th style={styles.scentsTableHead}>url</th>
          <th style={styles.scentsTableHead}>photo_link</th>
          <th style={styles.scentsTableHead}>notes</th>
        </tr>
      </thead>
      <tbody>
        {scents.map(scent => (
          <ScentRow scent={scent} key={scent.id} />
        ))}
      </tbody>
    </table>
  );
};

export default () => {
  const dispatch = useDispatch();
  const scents = useSelector(scentsSelector);
  useEffect(() => {
    dispatch(fetchScents());
  }, [dispatch]);

  const renderScents = () => {
    if (scents.length === 0) {
      return "No scents :(";
    }

    return <ScentsTable scents={scents} />;
  };

  return (
    <div>
      <h2>Scents</h2>
      {renderScents()}
      <h3>Create</h3>
      <ScentForm />
    </div>
  );
};
