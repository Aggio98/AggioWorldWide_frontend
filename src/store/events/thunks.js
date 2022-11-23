import { apiUrl } from "../../config/constants";
import axios from "axios";
import { allEvents } from "./slice";

export const fetchEvents = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/events`);
    //console.log("these are my events", response.data);
    dispatch(allEvents(response.data));
  } catch (e) {
    console.log("error fetching events", e.message);
  }
};
