import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchDyes } from "./api";
import { dyesSelector } from "./slice";

import DyeForm from "../components/DyeForm";

import { DyeRoute, pathFor } from "../common/routes";

const DyeRow = ({ dye }) => {
  return (
    <tr>
      <td>
        <Link to={pathFor(DyeRoute, { id: dye.id })}>{dye.id}</Link>
      </td>
      <td>{dye.name}</td>
      <td>{dye.url}</td>
      <td>{dye.photo_link}</td>
      <td>{dye.notes}</td>
    </tr>
  );
};

const DyesTable = ({ dyes }) => {
  const styles = {
    dyesTable: {
      border: "2px solid #333",
      width: "100%"
    },
    dyesTableHead: {
      border: "2px solid #333"
    }
  };
  return (
    <table style={styles.dyesTable}>
      <thead>
        <tr>
          <th style={styles.dyesTableHead}>id</th>
          <th style={styles.dyesTableHead}>name</th>
          <th style={styles.dyesTableHead}>url</th>
          <th style={styles.dyesTableHead}>photo_link</th>
          <th style={styles.dyesTableHead}>notes</th>
        </tr>
      </thead>
      <tbody>
        {dyes.map(dye => (
          <DyeRow dye={dye} key={dye.id} />
        ))}
      </tbody>
    </table>
  );
};

export default () => {
  const dispatch = useDispatch();
  const dyes = useSelector(dyesSelector);

  useEffect(() => {
    dispatch(fetchDyes());
  }, [dispatch]);

  const renderDyes = () => {
    if (dyes.length === 0) {
      return "No dyes :(";
    }

    return <DyesTable dyes={dyes} />;
  };

  return (
    <div>
      <h2>Dyes</h2>
      {renderDyes()}
      <h3>Create</h3>
      <DyeForm />
    </div>
  );
};
