import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchScents, scentsSelector } from "../store/scentsSlice.js";
import CreateScentForm from "../components/CreateScentForm.jsx";

const ScentRow = ({ scent }) => {
  return (
    <tr>
      <td>{scent.id}</td>
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
      width: "100%",
    },
    scentsTableHead: {
      border: "2px solid #333",
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
  const { scents } = useSelector(scentsSelector);

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
      <CreateScentForm />
    </div>
  );
};
