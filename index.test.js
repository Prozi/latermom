const LazyMap = require('.')

test('Calls factory once when asked for same key many times', () => {
    const hashCache = new LazyMap(n => n.toString(36).split('.').pop())
    const createHashSpy = jest.spyOn(hashCache, 'factory')

    new Array(1024).fill(() => expect(hashCache.get(123)).toBeTruthy()).map(fn => fn())

    expect(createHashSpy).toHaveBeenCalledTimes(1)
})

test('Getter is able to handle multiple arguments', () => {
    const positionCache = new LazyMap((x, y, z) => `${x}__${y}__${z}`)

    expect(positionCache.get(13, 3, 7)).toBe('13__3__7')
    expect(positionCache.data.get('13,3,7')).toBe('13__3__7')
})