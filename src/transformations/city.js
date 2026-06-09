const cityToLi = (city) =>
  `<li data-lat="${city.latitude}" data-lon="${city.longitude}">${city.name}, ${city.country}</li>`;

export const citiesToHtml = (cities) => cities.map(cityToLi).join("");

export const extractCityData = (element) => ({
  city: element.textContent,
  lat: element.dataset.lat,
  lon: element.dataset.lon,
});