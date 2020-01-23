import { withKnobs, object } from '@storybook/addon-knobs'

export default {
  title: 'Essentials',
  decorators: [withKnobs],
  meta: {
    BarChart: {
      title: 'Bar Chart',
      description: 'Show your data proportion with the help of a bar chart.',
    },
    LineChart: {
      title: 'Line Chart',
      description: 'Show your data proportion with the help of a line chart.',
    },
    RadarChart: {
      title: 'Radar Chart',
      description: 'Show your data proportion with the help of a radar chart.',
    },
    PieChart: {
      title: 'Pie Chart',
      description: 'Show your data proportion with the help of a pie chart.',
    },
  },
}

export { BarChart, LineChart, RadarChart, PieChart } from './essentials'
