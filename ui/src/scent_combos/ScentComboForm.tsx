import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createScentCombo } from "./api";
import { ScentCombo, DEFAULT_SCENT_COMBO_ID } from "./types";

import { fetchScents } from "../scents/api";
import { scentsSelector } from "../scents/slice";

type ScentComboFormProps = {
  existing?: ScentCombo;
};

export default ({ existing }: ScentComboFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const defaultScentCombo: ScentCombo = existing || {
    id: DEFAULT_SCENT_COMBO_ID,
    name: "",
    notes: "",
    scent_ids: []
  };

  const [name, setName] = useState(defaultScentCombo.name);
  const [notes, setNotes] = useState(defaultScentCombo.notes);
  const [scentIds, setScentIds] = useState(defaultScentCombo.scent_ids);

  const scents = useSelector(scentsSelector);

  useEffect(() => {
    dispatch(fetchScents());
  }, [dispatch]);

  const stateToScentCombo = (): ScentCombo => {
    return {
      id: DEFAULT_SCENT_COMBO_ID,
      name,
      notes,
      scent_ids: scentIds
    };
  };

  const onSubmit = () => {
    if (updating) {
      // TODO: Implement.
      console.error("Not implemented yet :]");
    } else {
      dispatch(createScentCombo(stateToScentCombo()));
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
