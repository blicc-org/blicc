import React from 'react'
import { useEffect } from 'react'
import { Chart } from 'chart.js'
import theme from '../../config/Theme.scss'
import './LineChart.scss'

export function LineChart({ id }) {
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
            borderWidth: 2,
            pointBorderWidth: 0,
            pointBackgroundColor: theme.primary,
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
    new Chart(document.getElementById(id), data)
  }, [id])

  return <canvas className="line-chart" id={id}></canvas>
}
