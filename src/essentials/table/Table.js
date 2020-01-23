export function Table(
  data = {},
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  var table = document.createElement('table')
  table.style.margin = '0 auto'

  function fillTable(ref, inputData) {
    ref.innerHTML = ''
    if (inputData && inputData.labels && inputData.datasets) {
      var tr = ref.insertRow()
      inputData.labels.forEach(
        label => (tr.insertCell().outerHTML = '<th>' + label + '</th>')
      )

      inputData.datasets.forEach(dataset => {
        var tr = ref.insertRow()
        if (dataset.data) {
          dataset.data.forEach(item => {
            tr.insertCell().innerText = item
          })
        }
      })
    }
  }

  fillTable(table, data)

  onDataUpdate(updatedData => {
    fillTable(table, updatedData)
  })

  return table
}
