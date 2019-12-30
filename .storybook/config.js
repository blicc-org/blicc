import { configure, addDecorator } from '@storybook/html'

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module)

addDecorator(story => {
  const div = document.createElement('div')
  div.style.width = '600px'
  div.style.height = '400px'

  const data = {
    labels: [
      'A',
      'B',
      'C',
      'D',
      'C',
      'F',
      'G',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
    ],
    data: [12, 19, 3, 5, 2, 3, 7, 11, 16, 7, 3, 18, 16, 1, 6, 8],
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
