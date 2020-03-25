import { hot } from "react-hot-loader/root";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "./Sidebar";
import Footer from "./Footer";
import * as colors from "../constants/colors";

import ScentsPage from "../pages/ScentsPage";

const styles: { [key: string]: React.CSSProperties } = {
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
    verticalAlign: "top"
  },
  contentCell: {
    border: "2px solid #333",
    width: "100%",
    padding: "5px 10px",
    verticalAlign: "top"
  }
};

const App = ({}) => {
  return (
    <Router>
      <div style={styles.root}>
        <div>
          <div style={styles.content}>
            <table style={styles.layoutTable}>
              <tbody>
                <tr>
                  <td style={styles.sidebarCell}>
                    <Sidebar />
                  </td>
                  <td style={styles.contentCell}>
                    <Switch>
                      <Route path="/scents">
                        <ScentsPage />
                      </Route>
                      <Route path="/">
                        <div>
                          <h2>this is the candle stuff</h2>
                          this is the rest of the stuffs this is the rest of the
                          stuffs this is the rest of the stuffs this is the rest
                          of the stuffs this is the rest of the stuffs this is
                          the rest of the stuffs this is the rest of the stuffs
                          this is the rest of the stuffs this is the rest of the
                          stuffs this is the rest of the stuffs this is the rest
                          of the stuffs this is the rest of the stuffs this is
                          the rest of the stuffs this is the rest of the
                          stuffsthis is the rest of the stuffs this is the rest
                          of the stuffs this is the rest of the stuffs this is
                          the rest of the stuffs this is the rest of the stuffs
                          this is the rest of the stuffs this is the rest of the
                          stuffs this is the rest of the stuffs this is the rest
                          of the stuffs this is the rest of the stuffs
                        </div>
                      </Route>
                    </Switch>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default hot(App);
