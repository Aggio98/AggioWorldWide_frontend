import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: null,
  eventsDetails: null,
  orders: null,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    allEvents: (state, action) => {
      state.events = action.payload;
    },
    newEvent: (state, action) => {
      console.log(state, "state event");
      // state.events = action.payload;
    },
    allDetails: (state, action) => {
      state.eventsDetails = action.payload;
    },
  },
});

export const { allEvents, newEvent, allDetails } = eventSlice.actions;

export default eventSlice.reducer;
