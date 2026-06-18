const animate = (el) => {
  el.classList.remove("fade-in");
  void el.offsetWidth;
  el.classList.add("fade-in");
};

export const renderWeather = ({ temperature, humidity, rain, city, unit }) => {
  const card = document.querySelector(".weather-card");
  card.dataset.state = "loaded";

  const temperatureElement = document.getElementById("temperature");
  temperatureElement.textContent = `${temperature}°${unit}`;
  animate(temperatureElement);

  const humidityElement = document.getElementById("humidity");
  humidityElement.textContent = `Relative humidity ${humidity}%`;
  animate(humidityElement);

  const cityElement = document.getElementById("city");
  cityElement.textContent = city;
  animate(cityElement);

  const rainElement = document.getElementById("rain");
  rainElement.textContent = rain > 0 ? "Raining" : "Not raining";
  animate(rainElement);
};