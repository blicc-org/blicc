import Chart from 'chart.js'
import { options, colorPalette } from '../common'

export function PieChart(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const chart = new Chart(ctx, {
    type: 'pie',
    data: takeFirst(addStyles(data)),
    options,
  })

  onDataUpdate(updatedData => {
    chart.data = takeFirst(addStyles(updatedData))
    chart.update()
  })

  return canvas
}

function takeFirst(data) {
  if (!data.datasets) return data
  data.datasets = [data.datasets[0]]
  return data
}

function addStyles(data) {
  if (!data.datasets) return data
  const datasets = data.datasets.map(dataset => {
    return {
      ...dataset,
      backgroundColor: colorPalette,
      borderColor: colorPalette,
      borderWidth: 2,
      fill: false,
    }
  })
  return { ...data, datasets }
}
