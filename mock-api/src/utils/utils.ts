export function randomDate(min: Date, max: Date) {
  return new Date(
    min.getTime() + Math.random() * (max.getTime() - min.getTime())
  )
}

export function randomNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min + 1) + min) * 100) / 100
}

export function calcOEE(
  availability: number,
  performance: number,
  quality: number
) {
  return (
    Math.round(
      (availability / 100) * (performance / 100) * (quality / 100) * 10000
    ) / 100
  )
}
