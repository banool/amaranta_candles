import { hot } from "react-hot-loader/root";
import React from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "./Sidebar.jsx";
import * as colors from "../constants/colors.js";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  content: {
    marginTop: 20,
    width: 900,
    backgroundColor: colors.backgroundLight
  },
  layoutTable: {
    border: "2px solid #333"
  },
  sidebarCell: {
    border: "2px solid #333",
    width: 220,
    padding: 5,
    verticalAlign: "top",
  },
  contentCell: {
    border: "2px solid #333",
    padding: 5,
    verticalAlign: "top",
  }
};

const App = ({}) => {
  return (
    <Router>
      <div style={styles.root}>
        <div style={styles.content}>
          <table style={styles.layoutTable}>
            <tbody>
              <tr>
                <td style={styles.sidebarCell}>
                  <Sidebar />
                </td>
                <td style={styles.contentCell}>
                  <h2>
                    this is the candle stuff
                  </h2>
                  this is the rest of the stuffs this is the rest of the stuffs
                  this is the rest of the stuffs this is the rest of the stuffs
                  this is the rest of the stuffs this is the rest of the stuffs
                  this is the rest of the stuffs this is the rest of the stuffs
                  this is the rest of the stuffs this is the rest of the stuffs
                  this is the rest of the stuffs this is the rest of the stuffs
                  this is the rest of the stuffs this is the rest of the
                  stuffsthis is the rest of the stuffs this is the rest of the
                  stuffs this is the rest of the stuffs this is the rest of the
                  stuffs this is the rest of the stuffs this is the rest of the
                  stuffs this is the rest of the stuffs this is the rest of the
                  stuffs this is the rest of the stuffs this is the rest of the
                  stuffs
                </td>
              </tr>
            </tbody>
          </table>
          {/*
          <Sidebar width={250} />
          <div>
            <Switch>
              <Route path="/a">
                <div>a</div>
              </Route>
              <Route path="/b">
                <div>bsdfasdfsaadfgd</div>
              </Route>
              <Route path="/">
                <div>home</div>
              </Route>
            </Switch>
          </div>
        */}
        </div>
      </div>
    </Router>
  );
};

export default hot(App);
