export type FactoryFunction<T = unknown> = (...args: any[]) => T

// Lazy Cache based on Map
export class Cache<T = unknown> {
  maxSize: number
  data = new Map()

  protected factoryFunction: FactoryFunction<T>

  // factory for creating entries
  constructor(factoryFunction: FactoryFunction<T>, maxSize: number = Infinity) {
    this.factoryFunction = factoryFunction
    this.maxSize = maxSize
  }

  // get data size
  get size(): number {
    return this.data.size
  }

  // creates a string from args
  createKey(...args: any[]): string {
    return args.length > 1 ? args.join(",") : args[0]
  }

  // wrapped factory function
  create(...args: any[]): T {
    return this.factoryFunction.apply(this, args)
  }

  // has entry at [args]
  hasKey(...args: any[]): boolean {
    return this.has(this.createKey.apply(this, args))
  }

  // has entry at [args]
  has(key: string): boolean {
    return this.data.has(key)
  }

  // get with key
  get(...args: any[]): T {
    const key = this.createKey.apply(this, args)

    if (this.hasKey(key)) {
      return this.data.get(key)
    }

    while (this.data.size >= this.maxSize) {
      const [keyToRemove] = this.data.entries().next().value

      this.deleteKey(keyToRemove)
    }

    const value = this.create.apply(this, args)
    this.data.set(key, value)

    return value
  }

  // delete entry at [args]
  deleteKey(...args: any[]): boolean {
    return this.delete(this.createKey.apply(this, args))
  }

  // delete entry at [args]
  delete(key: string): boolean {
    return this.data.delete(key)
  }
}
