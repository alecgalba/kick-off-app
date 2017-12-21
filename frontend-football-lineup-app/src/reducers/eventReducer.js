function eventReducer(state = { isFetching: false, myEvents: []}, action) {
  switch (action.type) {

    case "FETCHING_EVENTS":
      return Object.assign({}, state, { isFetching: true });

    case "FETCHED_EVENTS":
      return Object.assign({}, state, { myEvents: action.payload, isFetching: false });

    case "FETCHED_COUNTRY_COMPETITION_EVENTS":
      return Object.assign({}, state, { competitionEvents: action.payload, isFetching: false });

    default:
      return state
  };
};

export default eventReducer
