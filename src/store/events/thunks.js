import { apiUrl, geoKey } from "../../config/constants";
import axios from "axios";
import { allEvents, newEvent, allDetails } from "./slice";
import { showMessageWithTimeout } from "../appState/thunks";

export const fetchEvents = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/events`);
    //console.log("these are my events", response.data);
    dispatch(allEvents(response.data));
  } catch (e) {
    console.log("error fetching events", e.message);
  }
};

export const fetchDetails = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/details/${id}`);
    //console.log("this is the details", response);
    dispatch(allDetails(response.data));
  } catch (e) {
    console.log("error fetching details of art", e.message);
  }
};

export const postEvent =
  (title, description, imageUrl, address) => async (dispatch, getState) => {
    const { title, description, imageUrl, address } = getState().body;
    console.log(title, description, imageUrl, address);
    const { profile, token } = getState().user;

    // The address is just a string to send ot the api
    // 2- await Apend those lat/long to the event object
    // 3- await Send to the backend.

    try {
      // 1- Make a request to Geopify API with the address to get lat and long

      const geopifyResponse = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${address}${geoKey}`
      );

      console.log(geopifyResponse);

      const response = await axios.post(
        `${apiUrl}/${profile.id}/events`,
        {
          title,
          description,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //console.log("Response newEvent", response);
      dispatch(showMessageWithTimeout("success", true, "New auction created"));
      dispatch(newEvent(response.data.event));
    } catch (e) {
      console.error(e);
    }
  };

export const fetchGeo = () => async (dispatch, getState) => {
  const response = await axios.get(
    `https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=${geoKey}`
  );
};
