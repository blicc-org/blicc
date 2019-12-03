// Default export
export default () => {
  console.log('Hi from the default export!')
}

// Named export `doStuff`
export const render = (
  element,
  data,
  onDataUpdate,
  settings,
  setSettings,
  layout
) => {
  const node = document.createElement('p')
  const textnode = document.createTextNode('Hello World')
  node.appendChild(textnode)
  element.appendChild(node)

  console.log('data: ', data)
  console.log('settings: ', settings)
  console.log('layout: ', layout)
}
