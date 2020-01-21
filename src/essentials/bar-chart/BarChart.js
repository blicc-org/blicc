import Chart from 'chart.js'
import { options, colorPalette } from '../common'

export function BarChart(
  data = {},
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  const type = 'bar'
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const chart = new Chart(ctx, {
    type,
    data: addStyles(data),
    options: {
      ...options,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
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
      borderColor: '#f8f8f8',
      borderWidth: 1,
    }
  })
  return { ...data, datasets }
}
