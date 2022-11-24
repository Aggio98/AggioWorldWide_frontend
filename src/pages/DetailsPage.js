import React from "react";
import { useEffect } from "react";
import { fetchEvents } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectEvent } from "../store/events/selectors";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvent);
  console.log(events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <div>
      <div>
        {!events
          ? "Loading..."
          : events.map((e) => (
              <div className="event-home" key={e.id}>
                <img src={e.imageUrl} alt="Mr. T" />
                <p>{e.title}</p>
                <p>{e.rating}</p>
                <p>€ {e.price}</p>
                <p>{e.description}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export { DetailsPage };
