import Chart from 'chart.js'
import { options, colorPalette } from '../common'

export function LineChart(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  console.log(settings)
  const type = 'line'
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  let scales = {}

  if (settings && settings.unit) {
    if (settings.unit === 'time') {
      scales = {
        xAxes: [
          {
            type: 'time',
            distribution: 'linear',
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      }
    }
  }

  const chart = new Chart(ctx, {
    type,
    data: addStyles(data),
    options: {
      ...options,
      scales,
    },
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
