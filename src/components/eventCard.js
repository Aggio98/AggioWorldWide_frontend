import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img class="card-img-top" src={event.imageUrl} alt={event.title} />
      <div class="card-body">
        <h5 class="card-title">{event.title}</h5>
        <Rating name="simple-controlled" value={event.rating} readOnly />
        <p class="card-text">€ {event.price}</p>
        <p class="card-text">{event.date}</p>{" "}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to={`/details/${event.id}`}>
          <button className="btn btn-primary">Details</button>
        </Link>
        <Link to={`/order/${event.id}`}>
          <button className="btn btn-primary">Order Ticket</button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
