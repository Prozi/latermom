<h1 align="center">
Later Mom?
</h1>

<div align="center">

[<img src="https://img.shields.io/npm/v/@pietal.dev/cache?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/@pietal.dev/cache?activeTab=versions)

</div>

<p align="center">
You know when you were a kid and mom told you to clean your room,<br/>
when you was busy with something else, your answer would always be the same: 'later, mom'.
</p>

<p align="center">
This library is the universal 0 dependencies lazy cache implementation,<br/>
leveraging usage of es6 data structures.
</p>

## Installation

`yarn add @pietal.dev/cache --save`

## Usage

```javascript
const { Cache } = require("@pietal.dev/cache")

const maxSize = 2 // will limit max cache size upon cache.get()
const getUser = async (id) => {
  const response = await fetch("https://dummyjson.com/users/" + id)
  const { firstName, lastName, address } = await response.json()

  return {
    id,
    name: `${firstName} ${lastName}`,
    address,
  }
}

const usersCached = new Cache(getUser, maxSize)

Promise.all([
  usersCached.get(1),
  usersCached.get(2),
  usersCached.get(3),
  usersCached.get(4),
]).then((users) => {
  console.log(usersCached.data) // contains only last maxSize users (3 and 4)
  console.log(usersCached.size) // 2
})
```

```javascript
const { Cache } = require("@pietal.dev/cache")
// create cache with factory function (may take any number of parameters)
const cache = new Cache(() => Math.random())

// each time you call the cache.get with same parameters
// you will get the same once lazy cached answer
const a = cache.get(1, 2, 3)
const b = cache.get(1, 2, 3) // this will return the same as above
const c = cache.get(1, 2)
const d = cache.get(1, 2, 4)

console.log(a === b) // true
console.log(a !== c) // true
console.log(a !== d) // true
```

## API

```typescript
class Cache<T = unknown> {
  constructor(factoryFunction: (...args: any[]) => T, maxSize: number = Infinity) {
    //
  }
}
```

- creates a LaterMom (Lazy Map) instance with factory function for lazy cache

methods

- `get(...args: any[]): T` - get entry at key created from args, lazy instantiated by factory
- `createKey(...args: any[]): string` - creates string key
- `create(...args: any[]): T` - wrapped factory function
- `hasKey(key: string): boolean` - check if has entry at key
- `has(...args: any[]): boolean` - check if has entry at key created from args
- `deleteKey(key: string): boolean` - deletes entry from data at key
- `delete(...args): boolean` - deletes entry from data at key created from args
- `size: number` - returns size of data
- `maxSize: number` - on insert the oldest items are deleted until reached maxSize

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
