export const buildWeatherUrl = ({ lat, lon, ...params }) => ({
  ...params,
  lat,
  lon,
  url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,rain`,
});

