import React from "react";

import { apiBase } from "../common/store";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    marginTop: 5,
    textAlign: "right",
    fontSize: 14,
    opacity: 0.8
  },
  archive: {
    marginTop: 5,
    textAlign: "right",
    fontSize: 12,
    opacity: 0.7,
    fontStyle: "italic"
  }
};

// Says plainly that this is a frozen copy, so an empty "latest batch" doesn't
// read as a live site that's gone quiet. The date comes from the server rather
// than being hardcoded here, so the two can't drift apart.
export default props => {
  const [snapshotDate, setSnapshotDate] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`${apiBase}/archive`)
      .then(response => response.json())
      .then(data => {
        if (!cancelled) setSnapshotDate(data.snapshot_date);
      })
      .catch(() => {
        // A missing banner beats a broken page.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div style={styles.root}>
        {"made with <3 in amaranta house by max and dan (c) 1987"}
      </div>
      {snapshotDate && (
        <div style={styles.archive}>
          {`read-only archive — data frozen ${snapshotDate}`}
        </div>
      )}
    </div>
  );
};
