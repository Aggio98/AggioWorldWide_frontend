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

const EventsPage = () => {
  const dispatch = useDispatch();

  const events = useSelector(selectEvent);
  const continentsChoices = useSelector(selectContinents);
  const priceChoices = useSelector(selectPrice);
  console.log(continentsChoices);
  console.log(events);
  console.log(priceChoices);

  const [continents, setContinents] = useState([]);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filterContinent = (events) =>
    events.filter((event) => {
      if (continents.length === 0) {
        return true;
      } else if (continents.includes(event.continent)) {
        return true;
      } else {
        return false;
      }
    });

  const [priceFilter, setPriceFilter] = useState(1000);
  const filterByPrice = (events) =>
    events.filter((event) => {
      if (!priceFilter) {
        return true;
      }
      if (event.price < priceFilter) {
        return true;
      } else {
        return false;
      }
    });

  return (
    <div>
      <img
        className="image-event"
        src="https://www.worldforum.nl/wp-content/uploads/2019/12/KWA-41-1920x1080.jpg"
        alt="auditorium picture"
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
            <label for="price">Loction:</label>
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
          <body>
            <div class="rate">
              <input type="radio" id="star5" name="rate" value="5" />
              <label for="star5" title="text">
                5 stars
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label for="star4" title="text">
                4 stars
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label for="star3" title="text">
                3 stars
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label for="star2" title="text">
                2 stars
              </label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label for="star1" title="text">
                1 star
              </label>
            </div>
          </body>
        </div>
      </div>
      <div>
        {!events
          ? "Loading..."
          : filterContinent(filterByPrice(events)).map((e) => (
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
