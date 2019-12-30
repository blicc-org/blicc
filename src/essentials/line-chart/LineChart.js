import Chart from 'chart.js'
import { options, colorPalette, hexToRgbaString } from '../common'

export function LineChart(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  const type = 'line'
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
          borderColor: colorPalette.map(value => hexToRgbaString(value, 0.75)),
        },
      ],
    },
    options: {
      ...options,
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  })
  return canvas
}
