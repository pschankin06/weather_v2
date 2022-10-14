// storage.saveFavoriteCities(favoriteCities)
// const favoriteCities = storage.getFavoriteCities();
// const currentCity = storage.getCurrentCity();

export function storeCurrentCity(cityName) {
  localStorage.setItem('currentCity', cityName);
}

export function getCurrentCity() {
  const currentCity = localStorage.getItem('currentCity');
  return currentCity;
}

export function storeFavoriteCities(citiesList) {
  localStorage.setItem('favoriteCities', JSON.stringify(citiesList));
}

export function getFavoriteCities() {
  const citiesList = JSON.parse(localStorage.getItem('favoriteCities'));
  return citiesList;
}

export function deleteCityFromStorage(citiesList, cityName) {
  const index = citiesList.indexOf(cityName);
  citiesList.splice(index, 1);
  storeFavoriteCities(citiesList);
}
