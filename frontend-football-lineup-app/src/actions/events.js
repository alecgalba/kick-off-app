import moment from 'moment';
import baseURL from '../services/url';
const token = localStorage.getItem("jwtToken")
const userId = localStorage.getItem("id")

export function fetchedEvents(events) {
  return {
    type: "FETCHED_EVENTS",
    payload: events,
  }
};

export function fetchingEvents() {
  return {
    type: "FETCHING_EVENTS"
  }
};

export function fetchedCountryCompetitionEvents(events) {
  return {
    type: "FETCHED_COUNTRY_COMPETITION_EVENTS",
    payload: events,
  }
};

export function addEvent(event) {
  return function (dispatch) {
    dispatch(fetchingEvents())
    const body = event
    return fetch(`${baseURL}/events`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      'body': body
    })
      .then(res => res.json())
        .then((json) => {
          dispatch(fetchedEvents(json))
        })
  }
};

export function removeEvent(id) {
  return function (dispatch) {
    dispatch(fetchingEvents())
    const body = id
    return fetch(`${baseURL}/${id}/user_events`, {
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
          dispatch(fetchedEvents(json))
        })
  }
};

export function fetchMyKickOff(id) {
  return function (dispatch) {
    dispatch(fetchingCompetitions())
    fetch(`${baseURL}/${userId}/events`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedEvents(json))
      })
  }
};

export function fetchCountryCompetitionEvents(id) {
  return function(dispatch) {
    dispatch(fetchingEvents())
    fetch(`https://apifootball.com/api/?action=get_events&from=2017-08-30&to=2018-06-30&league_id=${league_id}&APIkey=dd1844f2b006f50f76c6feb71d92f26b5331d8f173c9e09fba716702d7729d48`)
      .then(res => res.json())
      .then(json => json.reverse())
        .then(json => {
          dispatch(fetchedCountryCompetitionEvents(json))
        })
  }
};
