import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchWaxes } from "./api";
import { waxesSelector, waxesLoadedSelector } from "./slice";

import Loading from "../components/Loading";
import { Wax } from "./types";

import WaxForm from "./WaxForm";

import useArchiveInfo from "../common/hooks/useArchiveInfo";

import { WaxRoute, pathFor } from "../common/routes";

type WaxRowProps = { wax: Wax };
const WaxRow = ({ wax }: WaxRowProps) => {
  return (
    <tr>
      <td>
        <Link to={pathFor(WaxRoute, { id: wax.id })}>{wax.id}</Link>
      </td>
      <td>{wax.name}</td>
      <td>{wax.url}</td>
      <td>{wax.photo_link}</td>
      <td>{wax.notes}</td>
    </tr>
  );
};

type WaxesTableProps = { waxes: Wax[] };
const WaxesTable = ({ waxes }: WaxesTableProps) => {
  const styles = {
    waxesTable: {
      border: "2px solid #333",
      width: "100%"
    },
    waxesTableHead: {
      border: "2px solid #333"
    }
  };
  return (
    <table style={styles.waxesTable}>
      <thead>
        <tr>
          <th style={styles.waxesTableHead}>id</th>
          <th style={styles.waxesTableHead}>name</th>
          <th style={styles.waxesTableHead}>url</th>
          <th style={styles.waxesTableHead}>photo_link</th>
          <th style={styles.waxesTableHead}>notes</th>
        </tr>
      </thead>
      <tbody>
        {waxes.map(wax => (
          <WaxRow wax={wax} key={wax.id} />
        ))}
      </tbody>
    </table>
  );
};

type WaxesPageProps = {};
const WaxesPage = ({}: WaxesPageProps) => {
  const dispatch = useDispatch();
  const waxes = useSelector(waxesSelector);
  const loaded = useSelector(waxesLoadedSelector);

  // In a frozen archive there is nothing to create, so the server reports
  // read_only and we render no form at all. Hidden until the flag is known
  // (archive === null) so a form never flashes in first.
  const archive = useArchiveInfo();

  useEffect(() => {
    dispatch(fetchWaxes());
  }, [dispatch]);

  const renderWaxes = () => {
    if (!loaded) {
      return <Loading />;
    }
    if (waxes.length === 0) {
      return "No waxes :(";
    }

    return <WaxesTable waxes={waxes} />;
  };

  return (
    <div>
      <h2>Waxes</h2>
      {renderWaxes()}
      {archive && !archive.readOnly && (
        <>
          <h3>Create</h3>
          <WaxForm />
        </>
      )}
    </div>
  );
};

export default WaxesPage;
