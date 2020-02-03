import { configure, addDecorator } from '@storybook/html'

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module)

addDecorator(story => {
  const div = document.createElement('div')
  div.style.width = '600px'
  div.style.height = '400px'

  let data = {
    labels: ['Schicht 1', 'Schicht 2', 'Schicht 3'],
    datasets: [
      {
        label: 'Verfügbarkeit',
        data: [72.2, 68.8, 59.1],
      },
      {
        label: 'Leistung',
        data: [29.4, 29.2, 29.5],
      },
      {
        label: 'Qualität',
        data: [100, 100, 100],
      },
      {
        label: 'OEE',
        data: [21.2, 20.1, 17.4],
      },
    ],
  }

  const dataWithDate = {
    labels: ['2020-01-01T00:00:00Z', '2020-03-10T00:00:00Z'],
    datasets: [
      {
        label: 'Data',
        data: [
          {
            x: '2020-01-02T00:00:00Z',
            y: 1,
          },
          {
            t: '2020-02-03T00:00:00Z',
            y: 10,
          },
          {
            t: '2020-02-05T00:00:00Z',
            y: 3,
          },
          {
            t: '2020-03-09T00:00:00Z',
            y: 7,
          },
        ],
      },
    ],
  }

  data = data

  const onDataUpdate = () => {}
  const settings = {}
  const setSettings = () => {}

  if (typeof story(data, onDataUpdate, settings, setSettings) === 'string') {
    div.innerHTML = story(data, onDataUpdate, settings, setSettings)
  } else {
    div.appendChild(story(data, onDataUpdate, settings, setSettings))
  }
  return div
})
