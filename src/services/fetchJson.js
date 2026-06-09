export const fetchJson = ({ url, ...params }) =>
  fetch(url).then(async (r) => {
    const result = await r.json();
    return { ...params, url, result };
  });

export const extractResults = ({ result }) => result.results ?? [];