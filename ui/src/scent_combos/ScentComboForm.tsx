import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createScentCombo } from "./api";
import { ScentCombo, StagingScentCombo } from "./types";

import { fetchScents } from "../scents/api";
import { scentsSelector } from "../scents/slice";

type ScentComboFormProps = {
  existing?: ScentCombo;
};

export default ({ existing }: ScentComboFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const defaults: StagingScentCombo = {
    name: "",
    notes: "",
    scents: []
  };

  if (existing !== undefined) {
    defaults.name = existing.name;
    defaults.notes = existing.notes;
    defaults.scents = existing.scents.map(scent => scent.id);
  }

  const [name, setName] = useState(defaults.name);
  const [notes, setNotes] = useState(defaults.notes);
  const [scentIds, setScentIds] = useState(defaults.scents);

  const scents = useSelector(scentsSelector);

  useEffect(() => {
    dispatch(fetchScents());
  }, [dispatch]);

  const stateToStagingScentCombo = (): StagingScentCombo => {
    return {
      name,
      notes,
      scents: scentIds
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
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          notes:
          <textarea value={notes} onChange={e => setNotes(e.target.value)} />
        </label>
        <br />
        <label>
          scents:
          <select
            multiple
            value={scentIds.map(String)}
            onChange={e => {
              setScentIds(
                Array.from(e.target.selectedOptions, item => Number(item.value))
              );
            }}
          >
            {scents === null
              ? null
              : scents.map(scent => (
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
