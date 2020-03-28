import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createDye } from "../dyes/api";
import { Dye, DEFAULT_DYE_ID } from "../dyes/types";

type DyeFormProps = {
  existing?: Dye;
};

export default ({ existing }: DyeFormProps) => {
  const updating = existing !== undefined;
  const dispatch = useDispatch();

  const defaultDye: Dye = existing || {
    id: DEFAULT_DYE_ID,
    name: "",
    url: "",
    notes: "",
    photo_link: ""
  };

  const [name, setName] = useState(defaultDye.name);
  const [url, setUrl] = useState(defaultDye.url);
  const [notes, setNotes] = useState(defaultDye.notes);
  const [photoLink, setPhotoLink] = useState(defaultDye.photo_link);

  const stateToDye = () => {
    return {
      id: DEFAULT_DYE_ID,
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
