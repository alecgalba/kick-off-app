import moment from 'moment';
import baseURL from '../services/url';
const token = localStorage.getItem("jwtToken")
const userId = localStorage.getItem("id")

export function fetchingCountries() {
  return {
    type: "FETCHING_COUNTRIES"
  }
};

export function fetchedCountries(countries) {
  return {
    type: "FETCHED_COUNTRIES",
    payload: countries,
  }
};

export function fetchCountries(id) {
  return function(dispatch) {
    dispatch(fetchingCountries())
    fetch(`${baseURL}/${userId}/countries`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchedCountries(json))
      })
  }


export function removeCountry(id) {
  return function (dispatch) {
    const body = JSON.stringify(id)
    dispatch(fetchingCountries())
    return fetch(`${baseURL}/${userId}/user_countries`, {
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
          dispatch(fetchedCountries(json)))
        })
  }
};

export function addCountry(country) {
  return function (dispatch) {
    dispatch(fetchingCountries())
    const body = JSON.stringify(country)
    return fetch(`${baseURL}/countries`, {
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
          dispatch(fetchedCountries(json))
        })
  }
}
