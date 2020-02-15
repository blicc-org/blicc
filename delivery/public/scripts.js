window.onload = function get_body() {
  body = document.getElementsByTagName('body')[0]
  var children = body.children
  for (var i = 0; i < children.length; i++) {
    var child = children[i]
    if (child.tagName === 'PRE') {
      var code = child.children[0]
      var highlightedText = highlight(code.innerText)
      code.innerHTML = highlightedText
    }
  }
}

function highlight(str) {
  let result = ''
  let open = true
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '"') {
      if (open) {
        result = result.concat(`<span>${str[i]}`)
      } else {
        result = result.concat(`${str[i]}</span>`)
      }
      open = !open
    } else {
      result = result.concat(str[i])
    }
  }
  return result
}
