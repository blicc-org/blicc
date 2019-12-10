export default {
  title: 'Essentials',
}

export function HelloWorld(data = [], sayHello) {
  ;() => sayHello()

  const div = document.createElement('div')

  const h1 = document.createElement('H1')
  h1.style.color = '#00ffff'
  const text = document.createTextNode('Click the button to change the color')
  h1.appendChild(text)
  div.appendChild(h1)

  const button = document.createElement('button')
  button.innerHTML = 'Change color'
  button.onclick = sayHello
  div.appendChild(button)

  return div
}
