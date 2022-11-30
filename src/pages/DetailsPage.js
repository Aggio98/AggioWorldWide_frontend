import React from "react";
import { useEffect } from "react";
import { fetchDetails } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectDetails } from "../store/events/selectors";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapController from "../components/MapController";

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
          <p>When: {eventDetails.date}</p>
          <p>Where: {eventDetails.address}</p>
          <p>€ {eventDetails.price}</p>
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
