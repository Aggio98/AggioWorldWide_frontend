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
  (title, description, imageUrl, address, date, price, capacity, continent) =>
  async (dispatch, getState) => {
    console.log(title, description, imageUrl, address);
    const { profile, token } = getState().user;

    try {
      const geopifyResponse = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${geoKey}
        `
      );
      //console.log(geopifyResponse);
      const latitude = geopifyResponse.data.results[0].lat;
      console.log(latitude);
      const longitude = geopifyResponse.data.results[0].lon;
      console.log(longitude);
      const response = await axios.post(
        `${apiUrl}/${profile.id}/events`,
        {
          title,
          description,
          imageUrl,
          date,
          price,
          capacity,
          address,
          latitude,
          longitude,
          continent,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response newEvent", response.data);
      dispatch(
        showMessageWithTimeout("success", true, "Event Created, Goodluck!")
      );
      dispatch(newEvent(response.data.event));
    } catch (e) {
      console.error(e);
    }
  };

export const createTickets =
  (name, email, quantity, userId, eventId) => async (dispatch, getState) => {
    const response = await axios.post(`${apiUrl}/orders/${eventId}`, {
      name,
      email,
      quantity,
      userId,
    });
    console.log(response, "thunk response orders");
  };
