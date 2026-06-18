import { debounce } from "./utils/debounce.js";
import { pipe, pipeAsync } from "./utils/pipe.js";

import { fetchJson, extractResults } from "./services/fetchJson.js";

import { buildSearchCitiesUrl } from "./services/cities.js";

import { buildWeatherUrl } from "./services/weather.js";

import { extractWeather, extractWeatherGeolocation } from "./transformations/weather.js";

import { citiesToHtml, extractCityData } from "./transformations/city.js";

import { getCurrentPosition } from "./services/geolocation.js";

import { extractCoords } from "./transformations/geolocation.js";

import { withUnit } from "./transformations/temperature.js";

import { renderWeather } from "./render/renderWeather.js";

import { renderCities } from "./render/renderCities.js";

import { createStore } from "./store/store.js";

// DOM

const searchInput = document.getElementById("search-city");

const citiesList = document.getElementById("cities");

const unitToggle = document.getElementById("unit-toggle");

// STORE

const store = createStore({
  unit: "C",
  weather: null,
});

// STATE

const setWeather = (weather) =>
  store.set((state) => ({
    ...state,
    weather,
  }));

const setUnit = (unit) =>
  store.set((state) => ({
    ...state,
    unit,
  }));

// SELECTORS

const selectWeatherView = ({ weather, unit }) => {
  if (!weather) return null;

  return withUnit(unit)(weather);
};

// RENDER

const renderCurrentWeather = () => {
  const state = store.get();

  const weatherView = selectWeatherView(state);

  if (!weatherView) return;

  renderWeather(weatherView);
};

const renderActiveUnit = () => {
  const { unit } = store.get();

  [...unitToggle.children].forEach((button) => {
    button.classList.toggle("active", button.value === unit);
  });
};

// SERVICES

const searchCities = pipeAsync(
  buildSearchCitiesUrl({ count: 5 }),
  fetchJson,
  extractResults,
);

const displayCities = pipeAsync(searchCities, citiesToHtml, renderCities);

const fetchWeather = pipeAsync(
  extractCityData,
  buildWeatherUrl,
  fetchJson,
  extractWeather,
);

const fetchWeatherByCoords = pipeAsync(
  getCurrentPosition,
  extractCoords,
  buildWeatherUrl,
  fetchJson,
  extractWeatherGeolocation,
);

// HELPERS
const getValue = (event) => event.target.value;

const isCityItem = (target) => target.matches("li");

// FLOWS

const searchFlow = pipe(getValue, displayCities);

const weatherFlow = pipeAsync(fetchWeather, setWeather, renderCurrentWeather);

const weatherByCoordsFlow = pipeAsync(fetchWeatherByCoords, setWeather, renderCurrentWeather);

const unitFlow = pipe(getValue, setUnit, () => {
  renderCurrentWeather();
  renderActiveUnit();
});

// EVENTS

const onCityClick = ({ target }) => {
  if (!isCityItem(target)) return;

  weatherFlow(target);
};

// LISTENERS

searchInput.addEventListener("input", debounce(searchFlow, 500));

citiesList.addEventListener("click", onCityClick);

unitToggle.addEventListener("click", unitFlow);

weatherByCoordsFlow().catch(console.error);