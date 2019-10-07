import React from 'react'
import { useEffect } from 'react'
import { Chart } from 'chart.js'

import theme from '../../config/Theme.scss'

export function LineChart() {
  useEffect(() => {
    const data = {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: theme.primary,
            borderWidth: 4,
            pointBackgroundColor: theme.secondary,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    }
    new Chart(document.getElementById('myChart'), data)
  }, [])

  return (
    <canvas
      className="my-4 w-100"
      id="myChart"
      width="900"
      height="380"
    ></canvas>
  )
}
