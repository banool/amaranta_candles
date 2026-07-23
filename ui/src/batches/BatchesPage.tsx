import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchBatches } from "./api";
import { batchesSelector } from "./slice";
import { Batch } from "./types";

import BatchForm from "./BatchForm";

import useArchiveInfo from "../common/hooks/useArchiveInfo";

import { BatchRoute, pathFor } from "../common/routes";

type BatchRowProps = { batch: Batch };
const BatchRow = ({ batch }: BatchRowProps) => {
  return (
    <tr>
      <td>
        <Link to={pathFor(BatchRoute, { id: batch.id })}>{batch.id}</Link>
      </td>
      <td>{batch.name}</td>
      <td>{batch.made_at}</td>
      <td>{batch.notes}</td>
    </tr>
  );
};

type BatchesTableProps = { batches: Batch[] };
const BatchesTable = ({ batches }: BatchesTableProps) => {
  const styles = {
    batchesTable: {
      border: "2px solid #333",
      width: "100%"
    },
    batchesTableHead: {
      border: "2px solid #333"
    }
  };
  return (
    <table style={styles.batchesTable}>
      <thead>
        <tr>
          <th style={styles.batchesTableHead}>id</th>
          <th style={styles.batchesTableHead}>name</th>
          <th style={styles.batchesTableHead}>made_at</th>
          <th style={styles.batchesTableHead}>notes</th>
        </tr>
      </thead>
      <tbody>
        {batches.map(batch => (
          <BatchRow batch={batch} key={batch.id} />
        ))}
      </tbody>
    </table>
  );
};

type BatchesPageProps = {};
const BatchesPage = ({}: BatchesPageProps) => {
  const dispatch = useDispatch();
  const batches = useSelector(batchesSelector);

  // In a frozen archive there is nothing to create, so the server reports
  // read_only and we render no form at all. Hidden until the flag is known
  // (archive === null) so a form never flashes in first.
  const archive = useArchiveInfo();

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  const renderBatches = () => {
    if (batches.length === 0) {
      return "No batches :(";
    }

    return <BatchesTable batches={batches} />;
  };

  return (
    <div>
      <h2>Batches</h2>
      {renderBatches()}
      {archive && !archive.readOnly && (
        <>
          <h3>Create</h3>
          <BatchForm />
        </>
      )}
    </div>
  );
};

export default BatchesPage;
