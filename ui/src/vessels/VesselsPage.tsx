import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchVessels } from "./api";
import { vesselsSelector } from "./slice";
import { Vessel } from "./types";

import VesselForm from "./VesselForm";

import { VesselRoute, pathFor } from "../common/routes";

type VesselRowProps = { vessel: Vessel };
const VesselRow = ({ vessel }: VesselRowProps) => {
  return (
    <tr>
      <td>
        <Link to={pathFor(VesselRoute, { id: vessel.id })}>{vessel.id}</Link>
      </td>
      <td>{vessel.name}</td>
      <td>{vessel.url}</td>
      <td>{vessel.photo_link}</td>
      <td>{vessel.notes}</td>
    </tr>
  );
};

type VesselsTableProps = { vessels: Vessel[] };
const VesselsTable = ({ vessels }: VesselsTableProps) => {
  const styles = {
    vesselsTable: {
      border: "2px solid #333",
      width: "100%"
    },
    vesselsTableHead: {
      border: "2px solid #333"
    }
  };
  return (
    <table style={styles.vesselsTable}>
      <thead>
        <tr>
          <th style={styles.vesselsTableHead}>id</th>
          <th style={styles.vesselsTableHead}>name</th>
          <th style={styles.vesselsTableHead}>url</th>
          <th style={styles.vesselsTableHead}>photo_link</th>
          <th style={styles.vesselsTableHead}>notes</th>
        </tr>
      </thead>
      <tbody>
        {vessels.map(vessel => (
          <VesselRow vessel={vessel} key={vessel.id} />
        ))}
      </tbody>
    </table>
  );
};

type VesselsPageProps = {};
const VesselsPage = ({}: VesselsPageProps) => {
  const dispatch = useDispatch();
  const vessels = useSelector(vesselsSelector);

  useEffect(() => {
    dispatch(fetchVessels());
  }, [dispatch]);

  const renderVessels = () => {
    if (vessels.length === 0) {
      return "No vessels :(";
    }

    return <VesselsTable vessels={vessels} />;
  };

  return (
    <div>
      <h2>Vessels</h2>
      {renderVessels()}
      <h3>Create</h3>
      <VesselForm />
    </div>
  );
};

export default VesselsPage;
