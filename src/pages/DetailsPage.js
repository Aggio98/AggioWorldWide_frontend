import React from "react";
import { useEffect } from "react";
import { fetchDetails } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectDetails } from "../store/events/selectors";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapController from "../components/MapController";
import { Link } from "react-router-dom";
import moment from "moment";

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
        <div style={{ margin: "8px" }}>
          <h2>{eventDetails.title}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <img
              src={eventDetails.imageUrl}
              alt={eventDetails.title}
              style={{ width: "500px" }}
            />
            <div style={{ margin: "100px" }}>
              <div
                class="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "13rem",
                  height: "6rem",
                  margin: "8px",
                  backgroundColor: "black",
                }}
              >
                <p>€ {eventDetails.price}</p>
                <Link to={`/order/${eventDetails.id}`}>
                  <button type="button" class="btn btn-success">
                    Reserve your spot
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <p>When: {moment(eventDetails.date).format("LLL")}</p>
          <p>Where: {eventDetails.address}</p>
          {/* <p>€ {eventDetails.price}</p>
          <Link to={`/order/${eventDetails.id}`}>
            <button type="button" class="btn btn-success">
              Reserve your spot
            </button>
          </Link> */}
          <p>{eventDetails.description}</p>

          <MapContainer
            style={{ height: "500px" }}
            center={[eventDetails.latitude, eventDetails.longitude]}
            zoom={15}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[eventDetails.latitude, eventDetails.longitude]}
            ></Marker>
            <MapController
              location={[eventDetails.latitude, eventDetails.longitude]}
            />
          </MapContainer>
          <div></div>
        </div>
      )}
    </div>
  );
};

export { DetailsPage };
