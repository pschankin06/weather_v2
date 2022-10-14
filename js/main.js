'use strict';
import {
  UI_ELEMENTS,
  showCityData,
  showForecast,
  addToFavorites
} from "./view.js";

import {
  storeCurrentCity,
  getCurrentCity,
  getFavoriteCities,
  deleteCityFromStorage
} from "./storage.js";

export const SERVER = {
  SERVER_URL: 'http://api.openweathermap.org/data/2.5/weather',
  COORDINATES_URL: 'http://api.openweathermap.org/geo/1.0/direct',
  FORECAST_URL: 'http://api.openweathermap.org/data/2.5/forecast',
  IMAGE_URL: `http://openweathermap.org/img/wn/`,
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
  UNITS: 'units=metric',
  NUMBER_OF_LOCATIONS: 1,
  NUMBER_OF_TIMESTAMPS: 'cnt=5',
}

export const favoriteCities = [];

window.addEventListener('load', event => {
  const currentCity = getCurrentCity();
  if (getCurrentCity()) {
    getCityData(currentCity);
    getCityCoordinates(currentCity);
  }

  const citiesFromStorage = getFavoriteCities();
  if (citiesFromStorage) {
    citiesFromStorage.forEach(city => addToFavorites(city));
  }
});

export function getCityName(event) {
  try {
    const cityName = UI_ELEMENTS.INPUT.value || event.currentTarget.textContent;
    const isNotValid = !cityName.trim() || parseInt(cityName);

    if (isNotValid) {
      throw new Error();
    } else {
      getCityData(cityName);
      getCityCoordinates(cityName);
    }
  } catch (error) {
    alert('Incorrect city name');
  }
}

async function getCityData(cityName) {
  try {
    const url = `${SERVER.SERVER_URL}?q=${cityName}&appid=${SERVER.API_KEY}&${SERVER.UNITS}`;
    const serverResponse = await fetch(url);
    const cityData = await serverResponse.json();
    console.log(cityData);
    showCityData(cityData);
    storeCurrentCity(cityData.name);
  } catch (error) {
    alert('Incorrect city name or server error');
    alert(error);
  }
}

async function getCityCoordinates(cityName) {
  try {
    const url = `${SERVER.COORDINATES_URL}?q=${cityName}&limit=${SERVER.NUMBER_OF_LOCATIONS}&appid=${SERVER.API_KEY}&${SERVER.UNITS}`;
    const serverResponse = await fetch(url);
    const cityData = await serverResponse.json();
    console.log(cityData);
    getCityForecast(cityData[0].lat, cityData[0].lon);
  } catch {
    alert('Incorrect city name or server error');
    alert(error);
  }
}

async function getCityForecast(latitude, longtitude) {
  try {
    const url = `${SERVER.FORECAST_URL}?lat=${latitude}&lon=${longtitude}&appid=${SERVER.API_KEY}&${SERVER.UNITS}&${SERVER.NUMBER_OF_TIMESTAMPS}`;
    const serverResponse = await fetch(url);
    const cityData = await serverResponse.json();
    console.log(cityData);
    showForecast(cityData);
  } catch (error) {
    alert('Incorrect coordinates or server error');
    alert(error);
  }
}

export function addToList(cityName) {
  favoriteCities.push(cityName);
  console.log(favoriteCities);
}

export function searchInList(cityName) {
  return favoriteCities.find(item => item === cityName);
}

export function deleteCity(cityName) {
  const index = favoriteCities.indexOf(cityName);
  favoriteCities.splice(index, 1);
  console.log(favoriteCities);
  deleteCityFromStorage(getFavoriteCities(), cityName);
}

export function convertTime(date) {
  const time = new Date(Number(date) * 1000);
  const timeHours = time.getHours() > 10 ? time.getHours() : `0${time.getHours()}`;
  const timeMinutes = time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`;
  const finalTime = `${timeHours}:${timeMinutes}`;
  return finalTime;
}

export function convertDate(date) {
  const time = new Date(Number(date) * 1000);
  const day = time.getDate() > 10 ? time.getDate() : `0${time.getDate()}`;
  const options = {
    month: 'long'
  }
  const finalDate = `${day} ${time.toLocaleDateString('en-US', options)}`;
  return finalDate;
}


// function getCityData(cityName) {
//   const url = `${SERVER.SERVER_URL}?q=${cityName}&appid=${SERVER.API_KEY}&${SERVER.UNITS}`;
//   fetch(url)
//     .then(response => response.json())
//     .then(cityData => {
//       console.log(cityData);
//       showCityData(cityData);
//       storeCurrentCity(cityData.name);
//     })
//     .catch(alert);
// }

// function getCityCoordinates(cityName) {
//   const url = `${SERVER.COORDINATES_URL}?q=${cityName}&limit=${SERVER.NUMBER_OF_LOCATIONS}&appid=${SERVER.API_KEY}&${SERVER.UNITS}`;
//   fetch(url)
//     .then(response => response.json())
//     .then(cityData => {
//       console.log(cityData);
//       getCityForecast(cityData[0].lat, cityData[0].lon);
//     })
//     .catch(alert);
// }

// function getCityForecast(latitude, longtitude) {
//   const url = `${SERVER.FORECAST_URL}?lat=${latitude}&lon=${longtitude}&appid=${SERVER.API_KEY}&${SERVER.UNITS}&${SERVER.NUMBER_OF_TIMESTAMPS}`;
//   fetch(url)
//     .then(response => response.json())
//     .then(cityData => {
//       console.log(cityData);
//       showForecast(cityData);
//     })
//     .catch(alert);
// }