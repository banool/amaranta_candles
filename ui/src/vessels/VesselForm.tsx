import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createVessel } from "./api";
import { Vessel, StagingVessel } from "./types";

const defaults: StagingVessel = {
  name: "",
  url: "",
  notes: "",
  photo_link: ""
};

type VesselFormProps = {
  existing?: Vessel;
};
export default ({ existing }: VesselFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const getInitial = <T extends unknown>(
    field: string,
    defaults: StagingVessel,
    existing?: Vessel
  ): NonNullable<T> => {
    if (existing !== undefined && existing[field] !== null) {
      return existing[field];
    }
    return defaults[field];
  };

  const [name, setName] = useState(getInitial<typeof defaults.name>("name", defaults, existing));
  const [url, setUrl] = useState(getInitial<typeof defaults.url>("url", defaults, existing));
  const [notes, setNotes] = useState(
    getInitial<typeof defaults.notes>("notes", defaults, existing)
  );
  const [photoLink, setPhotoLink] = useState(
    getInitial<typeof defaults.photo_link>("photo_link", defaults, existing)
  );

  const stateToVessel = (): StagingVessel => {
    return {
      name,
      url: url === defaults.url ? null : url,
      notes: notes === defaults.notes ? null : notes,
      photo_link: photoLink === defaults.photo_link ? null : photoLink
    };
  };

  const onSubmit = () => {
    if (updating) {
      // TODO: Implement.
      console.error("Not implemented yet :]");
    } else {
      dispatch(createVessel(stateToVessel()));
    }
  };

  return (
    <div>
      <form>
        <label>
          name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          url:
          <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
        </label>
        <br />
        <label>
          photo_link:
          <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
        </label>
        <br />
        <label>
          notes:
          <textarea value={notes} onChange={e => setNotes(e.target.value)} />
        </label>
        <br />
        <input type="button" value="Submit" onClick={onSubmit} />
      </form>
    </div>
  );
};
