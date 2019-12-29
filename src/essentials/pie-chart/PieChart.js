import * as d3 from 'd3'

export function PieChart(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  d3.select('.target').style('stroke-width', 8)

  return '<svg><circle class="target" style="fill: #69b3a2" stroke="black" cx=50 cy=50 r=40></circle></svg>'
}
