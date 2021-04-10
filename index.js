// Lazy Cache based on Map
module.exports = class LaterMom {
  // factory for creating entries
  constructor(factory) {
    this.factory = factory;
    this.data = new Map();
  }

  // creates a string from args
  getKey(...args) {
    return args.length > 1 ? args.join(",") : args[0];
  }

  // has entry at [args]
  has(...args) {
    const key = this.getKey(...args);
    return this.data.has(key);
  }

  // get entry at [args]
  get(...args) {
    const key = this.getKey(...args);
    let val = this.data.get(key);
    if (!val) {
      val = this.factory(...args);
      this.data.set(key, val);
    }
    return val;
  }

  // perform callback on each entry
  each(callback) {
    return this.data.forEach(callback);
  }

  // delete entry at [args]
  del(...args) {
    return this.data.delete(this.getKey(...args));
  }
};
