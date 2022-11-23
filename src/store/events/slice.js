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
  },
});

export const { allEvents } = eventSlice.actions;

export default eventSlice.reducer;
