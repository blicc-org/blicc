## Plugin development

Develop your own data visualization plugins for blicc. The plugins are framework independent. You can use frameworks like Vue, React, Angular as well as visualisation libraries like d3.js, chart.js etc.

**Prerequisites**

- node js installed

## Code Snippet

This is an example code snippet

```jsx
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
}
```
