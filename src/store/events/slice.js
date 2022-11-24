import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: null,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    allEvents: (state, action) => {
      state.event = action.payload;
    },
    newEvent: (state, action) => {
      console.log(state, "state event");
      state.event = action.payload;
    },
  },
});

export const { allEvents, newEvent } = eventSlice.actions;

export default eventSlice.reducer;
