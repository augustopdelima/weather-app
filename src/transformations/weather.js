export const extractWeather = ({ result, city }) => ({
  temperature: result.hourly.temperature_2m[0],
  humidity: result.hourly.relative_humidity_2m[0],
  rain: result.hourly.rain[0],
  city,
});

