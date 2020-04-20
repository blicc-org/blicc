export function useJsonHighlighter(): any {
  function highlight(str: string): string {
    let result = '<pre>'
    let open = true
    for (let i = 0; i < str.length; i++) {
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
    result = result.concat('</pre>')
    return result
  }

  return highlight
}
