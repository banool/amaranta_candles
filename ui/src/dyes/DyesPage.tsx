import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchDyes } from "./api";
import { dyesSelector, dyesLoadedSelector } from "./slice";

import Loading from "../components/Loading";
import { Dye } from "./types";

import DyeForm from "./DyeForm";

import useArchiveInfo from "../common/hooks/useArchiveInfo";

import { DyeRoute, pathFor } from "../common/routes";

type DyeRowProps = { dye: Dye };
const DyeRow = ({ dye }: DyeRowProps) => {
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

type DyesTableProps = { dyes: Dye[] };
const DyesTable = ({ dyes }: DyesTableProps) => {
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

type DyesPageProps = {};
const DyesPage = ({}: DyesPageProps) => {
  const dispatch = useDispatch();
  const dyes = useSelector(dyesSelector);
  const loaded = useSelector(dyesLoadedSelector);

  // In a frozen archive there is nothing to create, so the server reports
  // read_only and we render no form at all. Hidden until the flag is known
  // (archive === null) so a form never flashes in first.
  const archive = useArchiveInfo();

  useEffect(() => {
    dispatch(fetchDyes());
  }, [dispatch]);

  const renderDyes = () => {
    if (!loaded) {
      return <Loading />;
    }
    if (dyes.length === 0) {
      return "No dyes :(";
    }

    return <DyesTable dyes={dyes} />;
  };

  return (
    <div>
      <h2>Dyes</h2>
      {renderDyes()}
      {archive && !archive.readOnly && (
        <>
          <h3>Create</h3>
          <DyeForm />
        </>
      )}
    </div>
  );
};

export default DyesPage;
