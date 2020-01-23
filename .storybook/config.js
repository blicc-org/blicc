import { configure, addDecorator } from '@storybook/html'

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module)

addDecorator(story => {
  const div = document.createElement('div')
  div.style.width = '600px'
  div.style.height = '400px'

  const data = {
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
