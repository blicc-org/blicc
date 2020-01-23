import Chart from 'chart.js'
import { options, colorPalette } from '../common'

export function RadarChart(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const chart = new Chart(ctx, {
    type: 'radar',
    data: addStyles(data),
    options,
  })

  onDataUpdate(updatedData => {
    chart.data = addStyles(updatedData)
    chart.update()
  })

  return canvas
}

function addStyles(data) {
  if (!data.datasets) return data
  const datasets = data.datasets.map((dataset, index) => {
    return {
      ...dataset,
      backgroundColor: colorPalette[index],
      borderColor: colorPalette[index],
      borderWidth: 2,
      fill: false,
    }
  })
  return { ...data, datasets }
}
