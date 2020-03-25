import React from "react";

import { Link } from "react-router-dom";

import * as colors from "../constants/colors";

const pages = ["candles", "scents", "dyes", "waxes", "batches", "vessels", "scent combos"];

export default props => {
  return (
    <div>
      <h1>AMARANTA CANDLE SUPREME INC. LLC. PTY. LTD.</h1>
      <ul>
        <Link to="/">
          <li>home</li>
        </Link>
        {pages.map(page => (
          <Link to={`/${page}`} key={page}>
            <li>{page}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
