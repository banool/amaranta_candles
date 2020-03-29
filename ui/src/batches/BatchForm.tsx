import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createBatch } from "./api";
import { Batch, StagingBatch } from "./types";

const defaults: StagingBatch = {
  name: "",
  notes: "",
  made_at: "",
};

type BatchFormProps = {
  existing?: Batch;
};
export default ({ existing }: BatchFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const getInitial = <T extends unknown>(
    field: string,
    defaults: StagingBatch,
    existing?: Batch
  ): NonNullable<T> => {
    if (existing !== undefined && existing[field] !== null) {
      return existing[field];
    }
    return defaults[field];
  };

  const [name, setName] = useState(getInitial<typeof defaults.name>("name", defaults, existing));
  const [notes, setNotes] = useState(
    getInitial<typeof defaults.notes>("notes", defaults, existing)
  );
  const [madeAt, setMadeAt] = useState(
    getInitial<typeof defaults.notes>("made_at", defaults, existing)
  );

  const stateToBatch = (): StagingBatch => {
    return {
      name,
      notes: notes === defaults.notes ? null : notes,
      made_at: madeAt,
    };
  };

  const onSubmit = () => {
    if (updating) {
      // TODO: Implement.
      console.error("Not implemented yet :]");
    } else {
      dispatch(createBatch(stateToBatch()));
    }
  };

  return (
    <div>
      <form>
        <label>
          name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          made_at:
          <input
            type="datetime-local"
            value={madeAt}
            onChange={(e) => {
              console.log("change", e.target.value), setMadeAt(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <br />
        <input type="button" value="Submit" onClick={onSubmit} />
      </form>
    </div>
  );
};
