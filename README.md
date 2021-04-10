<h1 align="center">
LaterMom?
</h1>

<div align="center">

[![npm version](https://badge.fury.io/js/latermom.svg)](https://badge.fury.io/js/latermom) [![Known Vulnerabilities](https://snyk.io/test/github/Prozi/latermom/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Prozi/latermom?targetFile=package.json) [![Maintainability](https://api.codeclimate.com/v1/badges/cf7828e55f51edffbe3d/maintainability)](https://codeclimate.com/github/Prozi/latermom/maintainability)

</div>

<p align="center">
You know when you were a kid and mom told you to clean your room,<br/>
when you was busy with something else, your answer would always be the same.
</p>

<p align="center">
This library is the universal 0 dependencies lazy cache implementation,<br/>
leveraging usage of es6 data structures.
</p>

## Installation

`yarn add latermom --save`

## Usage

```javascript
// require library
const Cache = require("latermom");

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
```

## API

- constructor(factory: Function) - creates a LaterMom (Lazy Map) instance with factory function for lazy cache

methods

- getKey(...args) - creates string key from args
- has(...args) - check if has entry at key created from args
- get(...args) - get entry at key created from args, lazy instantiated by factory
- del(...args) - deletes entry from data at key created from args
- each(callback: Function) - performs callback on each entry in data

properties:

- data: Map

## Tests

```bash
$ jest
 PASS  ./index.test.js
  ✓ Calls factory once when asked for same key many times (62 ms)
  ✓ Getter is able to handle multiple arguments
  ✓ Readme has working code (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.946 s, estimated 1 s
Ran all test suites.
Done in 1.44s.
```

## License

MIT

## Author

Jacek Pietal @ 2019-2021
