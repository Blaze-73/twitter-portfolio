export function safeGetItem(key: string, fallback: string | null = null): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return fallback
  }
}

export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function safeRemoveItem(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function safeParseInt(value: string | null, fallback: number): number {
  if (value === null) return fallback
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? fallback : parsed
}
