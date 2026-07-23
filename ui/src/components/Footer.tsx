import React from "react";

import useArchiveInfo from "../common/hooks/useArchiveInfo";

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
// read as a live site that's gone quiet. The snapshot date comes from the
// server (via the shared archive hook) rather than being hardcoded here, so the
// two can't drift apart.
export default props => {
  const archive = useArchiveInfo();

  return (
    <div>
      <div style={styles.root}>
        {"made with <3 in amaranta house by max and dan (c) 1987"}
      </div>
      {archive && archive.readOnly && archive.snapshotDate && (
        <div style={styles.archive}>
          {`read-only archive — data frozen ${archive.snapshotDate}`}
        </div>
      )}
    </div>
  );
};
