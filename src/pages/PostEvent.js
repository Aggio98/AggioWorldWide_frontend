import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postEvent } from "../store/events/thunks";

const PostEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postEvent(title, description, image));

    setTitle("");
    setdescription("");
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dmdxlz22b");
  };

//   const res = await fetch("",{
//     method:"POST",
//     body: data
//   })

  const file = await res.json()
    console.log("file", file) 
    setImage(file.url) //put the url in local state, next step you can send it to the backend
  }

  return (
    <div>
      <h1>Make an Event</h1>
      <h5>Post one of your upcoming events</h5>
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Image:{" "}
              <input
                type="file"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </label>
          </p>
          <p>
            {image ? (
              <img src={image} alt="preview" style={{ width: "300px" }} />
            ) : null}
            <label>
              <br />
              Title:{" "}
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Description:{" "}
              <textarea
                type="text"
                value={description}
                onChange={(event) => setdescription(event.target.value)}
              />
            </label>
          </p>

          <br />
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export { PostEvent };
