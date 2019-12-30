import Chart from 'chart.js'
import { options, colorPalette, hexToRgbaString } from '../common'

export function BarChart(
  data = {},
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  const type = 'bar'
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  new Chart(ctx, {
    type,
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Some kind of Label',
          data: data.data,
          backgroundColor: colorPalette.map(value =>
            hexToRgbaString(value, 0.75)
          ),
          borderColor: colorPalette.map(value => hexToRgbaString(value, 1)),
          borderWidth: 1,
        },
      ],
    },
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
  return canvas
}
