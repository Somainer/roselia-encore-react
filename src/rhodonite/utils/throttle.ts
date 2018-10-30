export function debounce<T> (func: (...args: any[]) => T, delay: number) {
    let tmr: NodeJS.Timeout
    return (...args: any) => {
      clearTimeout(tmr)
      tmr = setTimeout(() => func(...args), delay)
    }
  }
  
export function throttle<T> (func: (...args: any[]) => T, threshold: number) {
    let last = 0
    let tmr: NodeJS.Timeout
    return (...args: any) => {
        const now = +new Date()
        clearTimeout(tmr)
        if (now - last < threshold) {
            tmr = setTimeout(() => func(...args), threshold)
        } else {
            last = now
            func(...args)
        }
    }
}
