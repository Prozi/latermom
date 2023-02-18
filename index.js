"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
// Lazy Cache based on Map
class Cache {
    // factory for creating entries
    constructor(factoryFunction, maxSize = Infinity) {
        this.data = new Map();
        this.factoryFunction = factoryFunction;
        this.maxSize = maxSize;
    }
    // get data size
    get size() {
        return this.data.size;
    }
    // creates a string from args
    createKey(...args) {
        return args.length > 1 ? args.join(",") : args[0];
    }
    // wrapped factory function
    create(...args) {
        return this.factoryFunction.apply(this, args);
    }
    // has entry at [args]
    hasKey(...args) {
        return this.has(this.createKey.apply(this, args));
    }
    // has entry at [args]
    has(key) {
        return this.data.has(key);
    }
    // get with key
    get(...args) {
        const key = this.createKey.apply(this, args);
        if (this.hasKey(key)) {
            return this.data.get(key);
        }
        while (this.data.size >= this.maxSize) {
            const [keyToRemove] = this.data.entries().next().value;
            this.deleteKey(keyToRemove);
        }
        const value = this.create.apply(this, args);
        this.data.set(key, value);
        return value;
    }
    // delete entry at [args]
    deleteKey(...args) {
        return this.delete(this.createKey.apply(this, args));
    }
    // delete entry at [args]
    delete(key) {
        return this.data.delete(key);
    }
}
exports.Cache = Cache;
