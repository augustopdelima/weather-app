export const buildSearchCitiesUrl =
  ({ count = 10, language = "en" } = {}) =>
  (cityName) => ({
    url: `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURI(cityName)}&count=${count}&language=${language}&format=json`,
  });