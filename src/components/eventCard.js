import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div>
      <Link to={`/details/${event.id}`}>
        <img className="event-image" src={event.imageUrl} alt={event.title} />
        <p>{event.title}</p>
        <Rating name="simple-controlled" value={event.rating} readOnly />
        <p>€ {event.price}</p>
        <p>{event.date}</p>{" "}
      </Link>
    </div>
  );
};

export default EventCard;
