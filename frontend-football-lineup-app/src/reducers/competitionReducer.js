function competitionReducer(state = { isFetching: false, myCompetitions: []}, action) {
  switch (action.type) {

    case "FETCHING_COMPETITIONS":
      return Object.assign({}, state, { isFetching: true });

    case "FETCHED_COMPETITIONS":
      return Object.assign({}, state, { myCompetitions: action.payload, isFetching: false });

    case "FETCHED_COUNTRY_COMPETITIONS":
      return Object.assign({}, state, { countryCompetitions: action.payload, isFetching: false });

    default:
      return state
  };
};

export default competitionReducer
