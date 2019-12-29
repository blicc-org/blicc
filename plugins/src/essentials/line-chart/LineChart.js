export function LineChart(
  data = [],
  onDataUpdate = () => {},
  settings = { value: 50 },
  setSettings = () => {}
) {
  var slider = document.createElement('input')
  slider.min = 1
  slider.max = 100
  slider.value = settings.value
  slider.type = 'range'

  slider.onmouseup = event => {
    setSettings({ ...settings, value: event.target.value })
  }

  slider.ontouchend = event => {
    setSettings({ ...settings, value: event.target.value })
  }

  return slider
}
