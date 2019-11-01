export function useTouch() {
  const isTouch = 'ontouchstart' in window
  return isTouch
}
