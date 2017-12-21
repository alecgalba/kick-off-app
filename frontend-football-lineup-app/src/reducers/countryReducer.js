function countryReducer(state = { isFetching: false, myCountries: []}, action) {
  switch (action.type) {

    case "REMOVE_COUNTRY":
      return Object.assign({}, state, {myCountries: state.myCountries.filter((country) => country.id !== action.payload)})

    case "FETCHED_COUNTRIES":
      return Object.assign({}, state, {myCountries: action.payload, isFetching: false} )

    case "FETCHING_COUNTRIES":
      return Object.assign({}, state, {isFetching: true})

    default:
      return state
  };
};

export default countryReducer;
