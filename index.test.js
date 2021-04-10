const Cache = require(".");

test("Calls factory once when asked for same key many times", () => {
  const hashCache = new Cache((n) => n.toString(36).split(".").pop());
  const createHashSpy = jest.spyOn(hashCache, "factory");

  new Array(1024)
    .fill(() => expect(hashCache.get(123)).toBeTruthy())
    .map((fn) => fn());

  expect(createHashSpy).toHaveBeenCalledTimes(1);
});

test("Getter is able to handle multiple arguments", () => {
  const positionCache = new Cache((x, y, z) => `${x}__${y}__${z}`);

  expect(positionCache.get(13, 3, 7)).toBe("13__3__7");
  expect(positionCache.data.get("13,3,7")).toBe("13__3__7");
});

test("Readme has working code", () => {
  // create cache with factory function (may take any number of parameters)
  const cache = new Cache(() => Math.random());

  // each time you call the cache.get with same parameters
  // you will get the same once lazy cached answer
  const a = cache.get(1, 2, 3);
  const b = cache.get(1, 2, 3);
  const c = cache.get(1, 2);
  const d = cache.get(1, 2, 4);

  expect(a).toEqual(b); // true
  expect(a).not.toEqual(c); // true
  expect(a).not.toEqual(d); // true
});
