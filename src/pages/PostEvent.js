import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postEvent } from "../store/events/thunks";
import { Image } from "../styled/Image";

const PostEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [capacity, setCapacity] = useState(0);
  const [date, setDate] = useState("");
  const [continent, setContinent] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      postEvent(
        title,
        description,
        image,
        address,
        date,
        price,
        capacity,
        continent
      )
    );

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Make an Event</h1>
      <h5>Post one of your upcoming events</h5>
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="formFileSm" className="form-label">
              Image:{" "}
              <input
                className="form-control form-control-sm"
                id="formFileSm"
                type="file"
                onChange={uploadImage}
              />
            </label>
          </p>

          <Image
            src={
              image
                ? image
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
          />
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              <br />
              Title of Event:{" "}
              <input
                type="text"
                className="form-control"
                style={{ width: "400px" }}
                value={title}
                placeholder="Title for Event"
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Address of Event:{" "}
              <input
                type="text"
                className="form-control"
                style={{ width: "400px" }}
                value={address}
                placeholder="Address for Event"
                onChange={(event) => setAddress(event.target.value)}
              />
            </label>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Continent:{" "}
              <input
                type="text"
                className="form-control"
                style={{ width: "250px" }}
                value={continent}
                placeholder="Continent"
                onChange={(event) => setContinent(event.target.value)}
              />
            </label>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Capacity:{" "}
              <input
                type="number"
                className="form-control"
                style={{ width: "250px" }}
                value={capacity}
                placeholder="Max Amount of People that can Attend"
                min="0"
                onChange={(event) => setCapacity(event.target.value)}
              />
            </label>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Description about Event:{" "}
              <textarea
                type="text"
                className="form-control"
                style={{ width: "400px" }}
                value={description}
                placeholder="Describe your Event"
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationCustom04" className="form-label">
              Date of Event:{" "}
              <input
                type="date"
                value={date}
                className="form-select"
                placeholder="Date"
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Price:{" "}
              <input
                type="number"
                className="form-control"
                value={price}
                placeholder="Price"
                onChange={(event) => setPrice(event.target.value)}
              />
            </label>
          </div>

          <br />
          <button type="submit" className="btn btn-success">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export { PostEvent };
