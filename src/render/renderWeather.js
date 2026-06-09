export const renderWeather = ({ temperature, humidity, rain, city }) => {
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.textContent = `Temperature ${temperature}`;

  const humidityElement = document.getElementById("humidity");
  humidityElement.textContent = `Relative humidity ${humidity}%`;

  const cityElement = document.getElementById("city");
  cityElement.textContent = city;

  const rainElement = document.getElementById("rain");
  rainElement.textContent = rain;
};