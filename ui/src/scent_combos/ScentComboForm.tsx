import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createScentCombo } from "./api";
import { ScentCombo, StagingScentCombo } from "./types";

import { fetchScents } from "../scents/api";
import { scentsSelector } from "../scents/slice";

const defaults: StagingScentCombo = {
  name: "",
  notes: "",
  scents: [],
};

type ScentComboFormProps = {
  existing?: ScentCombo;
};

export default ({ existing }: ScentComboFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const getInitial = <T extends unknown>(
    field: string,
    defaults: StagingScentCombo,
    existing?: ScentCombo,
    idsOnly = false
  ): NonNullable<T> => {
    if (existing !== undefined && existing[field] !== null) {
      if (idsOnly) {
        return existing[field].map((item) => item.id);
      }
      return existing[field];
    }
    return defaults[field];
  };

  const [name, setName] = useState(getInitial<typeof defaults.name>("name", defaults, existing));
  const [notes, setNotes] = useState(
    getInitial<typeof defaults.notes>("notes", defaults, existing)
  );
  const [scents, setScentIds] = useState(
    getInitial<typeof defaults.scents>("scents", defaults, existing, true)
  );

  const allScents = useSelector(scentsSelector);

  useEffect(() => {
    dispatch(fetchScents());
  }, [dispatch]);

  const stateToStagingScentCombo = (): StagingScentCombo => {
    return {
      name,
      notes,
      scents: scents,
    };
  };

  const onSubmit = () => {
    if (updating) {
      // TODO: Implement.
      console.error("Not implemented yet :]");
    } else {
      console.log(stateToStagingScentCombo());
      dispatch(createScentCombo(stateToStagingScentCombo()));
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
          notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <br />
        <label>
          scents:
          <select
            multiple
            value={scents.map(String)}
            onChange={(e) => {
              setScentIds(Array.from(e.target.selectedOptions, (item) => Number(item.value)));
            }}
          >
            {allScents === null
              ? null
              : allScents.map((scent) => (
                  <option key={scent.id} value={scent.id}>
                    {scent.name}
                  </option>
                ))}
          </select>
        </label>
        <br />
        <input type="button" value="Submit" onClick={onSubmit} />
      </form>
    </div>
  );
};
