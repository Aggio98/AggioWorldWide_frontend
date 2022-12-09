import { Rating } from "@mui/material";
import moment from "moment";

import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        backgroundColor: "black",
        margin: "16px",
      }}
    >
      <img className="card-img-top" src={event.imageUrl} alt={event.title} />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <Rating name="simple-controlled" value={event.rating} readOnly />
        <p className="card-text">€ {event.price}</p>
        <p className="card-text">{moment(event.date).format("LLL")}</p>{" "}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to={`/details/${event.id}`}>
          <button className="btn btn-primary" style={{ margin: "16px" }}>
            Details
          </button>
        </Link>
        <Link to={`/order/${event.id}`}>
          <button className="btn btn-primary" style={{ margin: "16px" }}>
            Order Ticket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
