export const selectEvent = (reduxState) => reduxState.events.events;
export const selectDetails = (reduxState) => reduxState.events.eventsDetails;
export const selectContinents = (reduxState) => {
  if (reduxState.events.events) {
    return [
      ...new Set(reduxState.events.events.map((event) => event.continent)),
    ];
  } else {
    return [];
  }
};
export const selectPrice = (reduxState) => {
  if (reduxState.events.events) {
    return [...new Set(reduxState.events.events.map((event) => event.price))];
  } else {
    return [];
  }
};
