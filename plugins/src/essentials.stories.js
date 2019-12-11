export default {
  title: 'Essentials',
  meta: {
    PieChart: {
      title: 'Pie Chart',
      description: 'This is a pie chart',
    },
    LineChart: {
      title: 'Line Chart',
      description: 'This is a line chart',
    },
    BarChart: {
      title: 'Bar Chart',
      description: 'This is a bar chart',
    },
  },
}

export function PieChart(data = [], sayHello = () => {}) {
  const div = document.createElement('div')

  const h1 = document.createElement('H1')
  h1.style.color = '#5555ff'
  const text = document.createTextNode('Click the button to change the color')
  h1.appendChild(text)
  div.appendChild(h1)

  const button = document.createElement('button')
  button.innerHTML = 'Change color'
  button.onclick = sayHello
  div.appendChild(button)

  return div
}

export const LineChart = () => '<h1>Line Chart</h1>'
export const BarChart = () => '<h1>Bar Chart</h1>'
