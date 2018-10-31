export function cached<T>(target: T, key: string, discriptor: PropertyDescriptor) {
    const cache = new WeakMap
    const prevFunc = discriptor.value
    discriptor.value = (...args: any) => {
        if(!cache.has(args)) cache.set(args, prevFunc.call(target, ...args))
        return cache.get(args)
    }
}