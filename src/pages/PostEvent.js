import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postEvent } from "../store/events/thunks";
import { Image } from "../styled/Image";

const PostEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postEvent(title, description, image));

    setTitle("");
    setDescription("");
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pvsnqwpt");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmdxlz22b/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    console.log("file", file);
    setImage(file.url); //put the url in local state, next step you can send it to the backend
  };

  return (
    <div>
      <h1>Make an Event</h1>
      <h5>Post one of your upcoming events</h5>
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Image: <input type="file" onChange={uploadImage} />
            </label>
          </p>
          <p>
            <Image
              src={
                image
                  ? image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              }
            />
            {/* {image ? (
              <Title style={{ fontSize: 20 }}>Succesfully uploaded!</Title>
            ) : (
              ""
            )} */}
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
              Location:{" "}
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Building:{" "}
              <input
                type="text"
                value={place}
                onChange={(event) => setPlace(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Capacity:{" "}
              <input
                type="number"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Description:{" "}
              <textarea
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Date:{" "}
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
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
