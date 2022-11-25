import React from "react";
import { useEffect } from "react";
import { fetchDetails } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectDetails } from "../store/events/selectors";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const eventDetails = useSelector(selectDetails);
  console.log(eventDetails);

  useEffect(() => {
    dispatch(fetchDetails(`${params.id}`));
  }, [dispatch, params.id]);

  return (
    <div>
      {!eventDetails ? (
        "Loading..."
      ) : (
        <div>
          {eventDetails.title}
          <img src={eventDetails.imageUrl} alt={eventDetails.title} />
          <p>When:{eventDetails.date}</p>
          <p>€ {eventDetails.price}</p>
          <p>Rating: {eventDetails.rating}</p>
          <p>{eventDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export { DetailsPage };
