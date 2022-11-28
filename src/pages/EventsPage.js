import React from "react";
import { useEffect, useState } from "react";
import { fetchEvents } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContinents,
  selectEvent,
  selectPrice,
} from "../store/events/selectors";
import { Link } from "react-router-dom";
import "./style.css";

const EventsPage = () => {
  const dispatch = useDispatch();

  const events = useSelector(selectEvent);

  const continentsChoices = useSelector(selectContinents);
  const priceChoices = useSelector(selectPrice);
  console.log(continentsChoices);
  console.log(events);
  console.log(priceChoices);

  const [continents, setContinents] = useState([]);
  const [rating, setRating] = useState(0);
  const [priceFilter, setPriceFilter] = useState(1000);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filterContinent = (events) =>
    events?.filter((event) => {
      if (continents.length === 0) {
        return true;
      } else if (continents.includes(event.continent)) {
        return true;
      } else {
        return false;
      }
    });

  const filterByPrice = (events) =>
    events?.filter((event) => {
      if (!priceFilter) {
        return true;
      }
      if (event.price < priceFilter) {
        return true;
      } else {
        return false;
      }
    });

  const filterByRating = (events) => {
    console.log(rating, "this is the rating");
    const filteredEvent = events.filter((event) => {
      if (rating === 0) {
        return true;
      }
      if (rating >= event.rating && rating <= event.rating) {
        return true;
      } else {
        return false;
      }
    });
    console.log(filteredEvent, "this is start filtered");
    return filteredEvent;
  };

  // Make a new useState for the stars rating = Done
  // OnChange of the start rating, update the useState of stars done

  return (
    <div>
      <img
        className="image-event"
        src="https://www.worldforum.nl/wp-content/uploads/2019/12/KWA-41-1920x1080.jpg"
        alt="auditorium"
      />
      <div>
        <h1>Events</h1>

        <div>
          <h5>
            <label for="price">Price (between 0 and 1000):</label>
          </h5>
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              id="price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
            <label>{priceFilter}</label>
          </div>
        </div>
        <div>
          <h5>
            <label for="price">Continent:</label>
          </h5>
          <div>
            {continentsChoices.map((choice) => {
              return (
                <>
                  <input
                    type="checkbox"
                    checked={continents.includes(choice)}
                    onChange={() => {
                      if (continents.includes(choice)) {
                        setContinents(continents.filter((c) => c !== choice));
                      } else {
                        setContinents([...continents, choice]);
                      }
                    }}
                  />
                  {choice}
                </>
              );
            })}
          </div>
        </div>
        <div>
          <h5>Ratings</h5>
          <div>
            <button
              onClick={() => {
                setRating(rating);
              }}
            >
              1 star
            </button>
            <p>2 star</p>
            <p>3 star</p>
            <p>4 star</p>
            <p>5 star</p>
          </div>
        </div>
      </div>
      <div>
        {!events
          ? "Loading..."
          : filterContinent(filterByPrice(filterByRating(events)))?.map((e) => (
              <div className="event-home" key={e.id}>
                <Link to={`/details/${e.id}`}>
                  <img src={e.imageUrl} alt="Mr. T" />
                  <p>{e.title}</p>
                  <p>{e.rating}</p>
                  <p>€ {e.price}</p>
                  <p>{e.date}</p>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export { EventsPage };
