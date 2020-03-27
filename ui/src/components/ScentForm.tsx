import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createScent } from "../scents/api";
import { Scent, DEFAULT_SCENT_ID } from "../scents/types";

type ScentFormProps = {
  existing?: Scent;
};

export default ({ existing }: ScentFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const defaultScent: Scent = existing || {
    id: DEFAULT_SCENT_ID,
    name: "",
    url: "",
    notes: "",
    photo_link: ""
  };

  const [name, setName] = useState(defaultScent.name);
  const [url, setUrl] = useState(defaultScent.url);
  const [notes, setNotes] = useState(defaultScent.notes);
  const [photoLink, setPhotoLink] = useState(defaultScent.photo_link);

  const stateToScent = () => {
    return {
      id: DEFAULT_SCENT_ID,
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
      dispatch(createScent(stateToScent()));
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
          <br />
          <label>
            notes:
            <textarea value={notes} onChange={e => setNotes(e.target.value)} />
          </label>
        </label>
        <br />
        <input type="button" value="Submit" onClick={onSubmit} />
      </form>
    </div>
  );
};
