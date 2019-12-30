import * as d3 from 'd3'

export function Example(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  var div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.padding = 0
  div.style.margin = 0
  div.style.backgroundColor = 'purple'
  var doc = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  doc.setAttribute('width', '100%')
  doc.setAttribute('fill', 'yellow')
  doc.setAttribute('display', 'block')
  doc.setAttribute('margin', 'auto')

  var svg = d3.select(doc)

  svg
    .append('circle')
    .attr('cx', 2)
    .attr('cy', 2)
    .attr('r', 40)
    .style('fill', 'blue')

  div.append(svg.node())

  return div
}
