import { renderHook, act } from '../../tests/react-hooks'
import { useJsonHighlighter } from './useJsonHighlighter'

describe('useJsonHighlighter', () => {
  it('highlight json string', () => {
    const { result } = renderHook(() => useJsonHighlighter(), null)
    const str = '{"hallo": "world"}'
    let output = ''
    act(() => {
      const highlighter: any = result.current
      output = highlighter(str)
    })

    expect(output).toEqual(
      `<pre>{<span>"hallo"</span>: <span>"world"</span>}</pre>`
    )
  })
})
