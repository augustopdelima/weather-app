export const toFahrenheit = (celsius) => Math.round(celsius * 9 / 5 + 32);

export const withUnit = (unit) => (data) => ({
  ...data,
  temperature: unit === "F" ? toFahrenheit(data.temperature) : data.temperature,
  unit,
});
