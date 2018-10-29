function selfish<T extends object>(obj: T): T {
    const cache = new WeakMap()
    return new Proxy(obj, {
        get (target, key) {
            const value = Reflect.get(target, key)
            if (typeof value === 'function') {
                if (!cache.has(value)) {cache.set(value, value.bind(target))}
                return cache.get(value)
            }
            return value
        }
    })
}

export default selfish