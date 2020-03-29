import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ScentRoute, pathFor } from "../common/routes";

import { scentSelector } from "./slice";
import { Scent } from "./types";

const ScentLink = ({ scentId }) => {
  const scent: Scent = useSelector(scentSelector(scentId));
  if (scent === undefined) {
    return null;
  }
  return (
    <div>
      <Link to={pathFor(ScentRoute, { id: scentId })}>{scent.name}</Link>
    </div>
  );
};

export default ScentLink;
