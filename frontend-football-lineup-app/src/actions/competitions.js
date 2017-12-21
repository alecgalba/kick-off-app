import moment from 'moment';
import baseURL from '../services/url';
const token = localStorage.getItem("jwtToken")
const userId = localStorage.getItem("id")

export function fetchedCompetitions(competitions) {
  return {
    type: "FETCHED_COMPETITIONS",
    payload: competitions,
  }
};

export function fetchingCompetitions() {
  return {
    type: "FETCHING_COMPETITIONS"
  }
};

export function fetchedCountryCompetitions(competitions) {
  return {
    type: "FETCHED_COUNTRY_COMPETITIONS",
    payload: competitions,
  }
};

export function addCompetition(competition) {
  return function (dispatch) {
    dispatch(fetchingCompetitions())
    return fetch(`${baseURL}/competitions`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      'body': competition
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedCompetitions(json))
        })
  }
};

export function removeCompetition(id) {
  return function (dispatch) {
    dispatch(fetchingCompetitions())
    const body = id
    return fetch(`${baseURL}/${id}/user_competitions`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedCompetitions(json))
        })
  }
};

export function fetchKickOff(id) {
  return function (dispatch) {
    dispatch(fetchingCompetitions())
    fetch(`${baseURL}/${userId}/competitions`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedCompetitions(json))
      })
  }
};

export function fetchCountryCompetitions(id) {
  return function(dispatch) {
    dispatch(fetchingCompetitions())
    fetch(`https://apifootball.com/api/?action=get_leagues&country_id=${country_id}&APIkey=dd1844f2b006f50f76c6feb71d92f26b5331d8f173c9e09fba716702d7729d48`)
      .then(res => res.json())
      .then(json => json.reverse())
        .then(json => {
          dispatch(fetchedCountryCompetitions(json))
        })
  }
};
