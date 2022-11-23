import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import eventsReducder from "./events/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    events: eventsReducder,
  },
});
