import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createDye } from "./api";
import { Dye, StagingDye } from "./types";

type DyeFormProps = {
  existing?: Dye;
};
export default ({ existing }: DyeFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const defaults: StagingDye = {
    name: "",
    url: "",
    notes: "",
    photo_link: ""
  };

  if (existing !== undefined) {
    defaults.name = existing.name;
    defaults.url = existing.url;
    defaults.notes = existing.notes;
    defaults.photo_link = existing.photo_link;
  }

  const [name, setName] = useState(defaults.name);
  const [url, setUrl] = useState(defaults.url);
  const [notes, setNotes] = useState(defaults.notes);
  const [photoLink, setPhotoLink] = useState(defaults.photo_link);

  const stateToDye = (): StagingDye => {
    return {
      name,
      url,
      notes,
      photo_link: photoLink
    };
  };

  const onSubmit = () => {
    if (updating) {
      // TODO: Implement.
      console.error("Not implemented yet :]");
    } else {
      dispatch(createDye(stateToDye()));
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
          url:
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </label>
        <br />
        <label>
          photo_link:
          <input
            type="text"
            value={photoLink}
            onChange={e => setPhotoLink(e.target.value)}
          />
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
