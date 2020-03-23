import React from "react";

import { Link } from "react-router-dom";

import * as colors from "../constants/colors.js";

const styles = {
  link: {}
};

const pages = ["candles", "scents", "dyes", "waxes", "batches", "vessels", "scent combos"];

export default props => {
  return (
    <div>
      <h1>AMARANTA CANDLE LLC. INC.</h1>
      <ul component="nav">
        <Link to="/">
          <li style={styles.link}>home</li>
        </Link>
        {pages.map(page => (
          <Link to={`/${page}`} key={page}>
            <li style={styles.link}>{page}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
