export type FactoryFunction<T = unknown> = (...args: any[]) => T;
export declare class Cache<T = unknown> {
    maxSize: number;
    data: Map<any, any>;
    protected factoryFunction: FactoryFunction<T>;
    constructor(factoryFunction: FactoryFunction<T>, maxSize?: number);
    get size(): number;
    createKey(...args: any[]): string;
    create(...args: any[]): T;
    hasKey(...args: any[]): boolean;
    has(key: string): boolean;
    get(...args: any[]): T;
    deleteKey(...args: any[]): boolean;
    delete(key: string): boolean;
}
