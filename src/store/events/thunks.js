import { apiUrl } from "../../config/constants";
import axios from "axios";
import { allEvents, newEvent } from "./slice";
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

export const postEvent =
  (title, description, imageUrl) => async (dispatch, getState) => {
    const { profile, token } = getState().user;
    //console.log(title, description, imageUrl);
    try {
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
      console.log("Response newEvent", response);
      dispatch(showMessageWithTimeout("success", true, "New auction created"));
      dispatch(newEvent(response.data.event));
    } catch (e) {
      console.error(e);
    }
  };
