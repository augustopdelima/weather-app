# Weather App

A vanilla JavaScript weather app built with functional programming patterns. Data from [Open-Meteo](https://open-meteo.com/).

## Features

- Search cities with autocomplete
- Current temperature (with °C/°F toggle), humidity, and rain status
- Geolocation — auto-fetches weather at your location on load
- State managed through a minimal store with selectors
- Unit toggle re-applies `withUnit(unit)` to cached data — no extra API calls
- Glassmorphism dark UI

## Architecture

```
src/
├── main.js                  — Entry point, wires store, pipes, and events
├── style.css                — Styles
├── render/
│   ├── renderWeather.js     — Renders weather data to DOM
│   └── renderCities.js      — Renders city list to DOM
├── services/
│   ├── cities.js            — City search API URL builder
│   ├── weather.js           — Weather API URL builder
│   ├── fetchJson.js         — Generic fetch + JSON extract
│   └── geolocation.js       — Browser geolocation wrapper
├── transformations/
│   ├── weather.js           — Extracts weather fields from API
│   ├── city.js              — City data extraction + HTML
│   ├── temperature.js       — Unit conversion (pure functions)
│   ├── geolocation.js       — Extracts lat/lon from Position
│   └── location.js          — Extracts city name from timezone
├── store/
│   └── store.js             — Minimal immutable store
└── utils/
    ├── debounce.js          — Debounce helper
    └── pipe.js              — pipe (sync) and pipeAsync utilities
```

## Data flow

```
Search:     input → debounce → buildSearchCitiesUrl → fetchJson → extractResults
                              → citiesToHtml → renderCities

City click: extractCityData → buildWeatherUrl → fetchJson → extractWeather
                              → store.set(weather) → selectWeatherView(withUnit)
                              → renderWeather

Geolocation: getCurrentPosition → extractCoords → buildWeatherUrl → fetchJson
                              → extractWeatherGeolocation → store.set(weather)
                              → selectWeatherView(withUnit) → renderWeather

Unit toggle: setUnit(unit) → selectWeatherView(withUnit) → renderWeather
```


