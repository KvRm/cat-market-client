export function debounce<T>(cb: (v: T) => unknown, wait = 500) {
  let timeoutId: number
  return (v: T) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      cb(v)
    }, wait)
  }
}
