## Later, Mom

This is really a 0 dependencies Lazy Set implementation leveraging usage of es6 data structures and lazy caching.

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

## License

MIT

## Author

Jacek Pietal @ 2019
