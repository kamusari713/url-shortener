export function incrementCount(
  map: Record<string, number>,
  key?: string,
): void {
  if (!key) return
  map[key] = (map[key] ?? 0) + 1
}
