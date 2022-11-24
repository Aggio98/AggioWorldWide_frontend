import React from "react";
import { useEffect } from "react";
import { fetchEvents } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectEvent } from "../store/events/selectors";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvent);
  console.log(events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <div>
      <img
        className="image-event"
        src="https://www.worldforum.nl/wp-content/uploads/2019/12/KWA-41-1920x1080.jpg"
        alt="auditorium picture"
      />
      <p>Events</p>

      <div>
        {!events
          ? "Loading..."
          : events.map((e) => (
              <div className="event-home" key={e.id}>
                <Link to={`/details/${e.id}`}>
                  <img src={e.imageUrl} alt="Mr. T" />
                  <p>{e.title}</p>
                  <p>{e.rating}</p>
                  <p>€ {e.price}</p>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export { EventsPage };
