import * as React from "react";
import { useEffect, useState } from "react";
import { fetchEvents } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectContinents, selectEvent } from "../store/events/selectors";
import { Rating } from "@mui/material";
import EventCard from "../components/EventCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const dispatch = useDispatch();

  const events = useSelector(selectEvent);

  const continentsChoices = useSelector(selectContinents);
  // console.log(continentsChoices);
  // console.log(events);
  // console.log(priceChoices);

  const [continents, setContinents] = useState([]);
  const [rating, setRating] = useState(0);
  const [priceFilter, setPriceFilter] = useState(1000);
  const [toggle, setToggle] = useState(false);

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
    const filteredEvent = events.filter((event) => {
      if (rating === 0) {
        return true;
      }
      if (event.rating === rating || event.rating > rating) {
        return true;
      } else {
        return false;
      }
    });
    //console.log(filteredEvent, "this is start filtered");
    return filteredEvent;
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const getCenterPoint = (events) => {
    let totalLon = 0;
    let totalLat = 0;
    events.forEach((event) => {
      totalLon += event.longitude;
      totalLat += event.latitude;
    });
    return [totalLat / events.length, totalLon / events.length];
  };

  return (
    <div>
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
              {continentsChoices.map((choice, index) => {
                return (
                  <div key={index}>
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
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h5>Ratings</h5>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event) => {
                setRating(parseFloat(event.target.value));
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {!toggle ? "MAP" : "LIST"}
        </button>

        <div>
          {!toggle ? (
            <div>
              {!events
                ? "Loading..."
                : filterContinent(filterByPrice(filterByRating(events)))?.map(
                    (e, index) => <EventCard key={index} event={e} />
                  )}
            </div>
          ) : (
            <div>
              {!events ? (
                "Loading map"
              ) : (
                <div>
                  <MapContainer
                    style={{ height: "500px" }}
                    center={getCenterPoint(events)}
                    zoom={2}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filterContinent(
                      filterByPrice(filterByRating(events))
                    )?.map((event) => (
                      <Marker position={[event.latitude, event.longitude]}>
                        <Popup>
                          <img
                            alt={event.name}
                            style={{ width: "100px", borderRadius: "0.5em" }}
                            src={event.imageUrl}
                          />
                          <p>{event.title}</p>
                          <Link to={`/details/${event.id}`}>
                            <button>More Details</button>
                          </Link>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { EventsPage };
