import { debounce } from "./utils/debounce.js";
import { pipeAsync } from "./utils/pipe.js";
import { fetchJson, extractResults } from "./services/fetchJson.js";
import { extractWeather } from "./transformations/weather.js";
import { citiesToHtml, extractCityData } from "./transformations/city.js";
import { renderWeather } from "./render/renderWeather.js";
import { renderCities } from "./render/renderCities.js";
import { buildSearchCitiesUrl } from "./services/cities.js";
import { buildWeatherUrl } from "./services/weather.js";

const serach_input = document.getElementById("search-city");
const citiesList = document.getElementById("cities");

const searchCities = pipeAsync(
  buildSearchCitiesUrl({ count: 5 }),
  fetchJson,
  extractResults,
);

const displayCities = pipeAsync(searchCities, citiesToHtml, renderCities);

const displayWeather = pipeAsync(
  extractCityData,
  buildWeatherUrl,
  fetchJson,
  extractWeather,
  renderWeather,
);

const onSearch = (event) => {
  displayCities(event.target.value);
};

const onCityClick = (event) => {
  if (!event.target.matches("li")) return;
  displayWeather(event.target);
};

serach_input.addEventListener("input", debounce(onSearch, 500));

citiesList.addEventListener("click", onCityClick);
