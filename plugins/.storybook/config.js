import { configure, addDecorator } from '@storybook/html'

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module)

var settings = {}

addDecorator(story => {
  const div = document.createElement('div')

  const data = [12, 19, 3, 5, 2, 3]

  function setSettings(value) {
    console.log(value)
    settings = value
  }

  if (typeof story(data, settings, setSettings) === 'string') {
    div.innerHTML = story(data, settings, setSettings)
  } else {
    div.appendChild(story(data, settings, setSettings))
  }
  return div
})