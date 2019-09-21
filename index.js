module.exports = class LazyMap {
    constructor(getter) {
        this.factory = (...args) => getter.apply(this, args)
        this.data = new Map()
    }
    del(key) {
        return this.data.delete(key)
    }
    get(...args) {
        const key = args.length > 1 ? args.join(',') : args[0]
        let val = this.data.get(key)
        if (!val) {
            val = this.factory(...args)
            this.data.set(key, val)
        }
        return val
    }
    each(cb) {
        return this.data.forEach(cb)
    }
}
