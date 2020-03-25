import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createScent } from "../store/scentsSlice.js";

export default ({}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [photoLink, setPhotoLink] = useState("");

  const onCreateScent = () => {
    console.log("creating");
    dispatch(
      createScent({
        name,
        url,
        notes,
        photo_link: photoLink
      })
    );
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
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </label>
        <label>
          notes:
          <input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </label>
        <label>
          photo_link:
          <input
            type="text"
            value={photoLink}
            onChange={e => setPhotoLink(e.target.value)}
          />
        </label>
        <input type="button" value="Submit" onClick={onCreateScent} />
      </form>
    </div>
  );
};
