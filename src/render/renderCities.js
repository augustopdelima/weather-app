export const renderCities = (html) => {
  const list = document.getElementById("cities");
  list.innerHTML = html;

  Array.from(list.children).map((li, i) => {
    li.style.animationDelay = `${i * 0.04}s`;
  });
};