// cache.ts
const cache = new Map<string, any>()

export function setCache(key: string, value: any) {
  cache.set(key, value)
}

export function getCache(key: string) {
  return cache.get(key)
}
