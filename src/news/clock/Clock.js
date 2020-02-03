export function Clock(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  const clock = document.createElement('h1')
  clock.style.fontFamily = 'digital-7,Charcoal,sans-serif'
  clock.style.display = 'flex'
  clock.style.justifyContent = 'center'
  clock.style.alignItems = 'center'
  clock.style.fontWeight = 'bold'
  clock.style.height = '100%'
  clock.style.padding = 0
  clock.style.margin = 0

  function formatTime(d) {
    let hours = d.getHours()
    let minutes = d.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    const time = hours + ':' + minutes + ' ' + ampm
    return time
  }

  function drawClock(ref, inputData) {
    if (inputData && inputData.datasets[0] && inputData.datasets[0].data[0]) {
      ref.innerHTML = formatTime(new Date(inputData.datasets[0].data[0]))
    }
  }

  drawClock(clock, data)

  onDataUpdate(updatedData => {
    drawClock(clock, updatedData)
  })

  return clock
}
