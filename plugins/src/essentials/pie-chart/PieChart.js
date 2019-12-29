export function PieChart(
  data = [],
  onDataUpdate = () => {},
  settings = { color: '#ff55ff' },
  setSettings = () => {}
) {
  console.log('render plugin')
  const div = document.createElement('div')

  const h1 = document.createElement('H1')
  h1.style.color = settings.color
  const text = document.createTextNode('Click the button to change the color')
  h1.appendChild(text)
  div.appendChild(h1)

  const button = document.createElement('button')
  button.innerHTML = 'Change color'
  button.onclick = () => {
    if (settings.color !== '#ff55ff') {
      setSettings({ ...settings, color: '#ff55ff' })
    } else {
      setSettings({ ...settings, color: '#5555ff' })
    }
  }
  div.appendChild(button)

  return div
}
