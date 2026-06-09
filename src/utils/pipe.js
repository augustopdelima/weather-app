export const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const pipeAsync =
  (...fns) =>
  (value) =>
    fns.reduce(
      (promise, fn) => promise.then(fn),
      Promise.resolve(value)
    );