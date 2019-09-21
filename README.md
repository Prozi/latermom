## Later, Mom

This is really a 0 dependencies Lazy Map implementation leveraging usage of es6 data structures and lazy caching.

[![npm version](https://badge.fury.io/js/latermom.svg)](https://badge.fury.io/js/latermom) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Prozi/latermom/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Prozi/latermom/?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/Prozi/latermom/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Prozi/latermom?targetFile=package.json) [![Maintainability](https://api.codeclimate.com/v1/badges/cf7828e55f51edffbe3d/maintainability)](https://codeclimate.com/github/Prozi/latermom/maintainability)

## Installation

`yarn add latermom --save`

## Usage

```javascript
const Mom = require('latermom')

// create Mom, with factory function that takes any number of parameters
const mom = new Mom(_ => Math.random())

const a = mom.get(1, 2, 3)

const b = mom.get(1, 2, 3)

if (a !== b) {
    throw new Error('Something is not ok')
}
```

## API

* constructor(factory: Function) - creates a LaterMom (Lazy Map) instance with factory function for lazy cache

methods

* getKey(...args) - creates string key from args
* get(...args) - get entry at key created from args, lazy instantiated by factory
* del(...args) - deletes entry from data at key created from args
* each(callback: Function) - performs callback on each entry in data

properties:

* data: Map

## License

MIT

## Author

Jacek Pietal @ 2019
