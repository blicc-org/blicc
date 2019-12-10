export default {
  title: 'Essentials',
}

export function HelloWorld() {
  var h = document.createElement('H1')
  var t = document.createTextNode('Hello World')
  h.appendChild(t)
  return h
}
