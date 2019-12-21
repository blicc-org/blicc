import { renderHook, act } from '@testing-library/react-hooks'
import { useArrangement, ACTION } from '../useArrangement'

describe('useArrangement for removing elements', () => {
  it('Remove one out of three or more', () => {
    const { result } = renderHook(() => useArrangement())
    const ids = []

    act(() => {
      const [arrangement, insert, remove] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.RIGHT)
      ids[2] = insert(ids[1], ACTION.RIGHT)
      remove(ids[1])
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'row',
      items: [
        {
          id: ids[0],
        },
        {
          id: ids[2],
        },
      ],
    })
  })
})
