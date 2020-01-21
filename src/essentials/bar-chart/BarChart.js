import Chart from 'chart.js'
import { options, addColors } from '../common'

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
    data: addColors(data),
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
    chart.data = addColors(updatedData)
    chart.update()
  })

  return canvas
}
