import { renderHook, act } from '../../../tests/react-hooks'
import { useArrangement, ACTION } from '../useArrangement'

describe('useArrangement for removing elements', () => {
  it('Remove single one', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: any = []

    act(() => {
      const [arrangement, insert, remove] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      remove(ids[0])
    })

    expect(result.current[0]).toStrictEqual({})
  })

  it('Remove one of two', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: any = []

    act(() => {
      const [arrangement, insert, remove] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.RIGHT)
      remove(ids[1])
    })

    expect(result.current[0]).toStrictEqual({
      id: ids[0],
    })
  })

  it('Remove one out of three or more', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

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

  it('Remove one in between levels', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert, remove] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.RIGHT)
      ids[2] = insert(ids[1], ACTION.RIGHT)
      ids[3] = insert(ids[2], ACTION.BOTTOM)
      remove(ids[1])
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'row',
      items: [
        {
          id: ids[0],
        },
        {
          direction: 'column',
          items: [
            {
              id: ids[2],
            },
            {
              id: ids[3],
            },
          ],
        },
      ],
    })
  })

  it('Remove one that does not exist', () => {
    const { result }: any = renderHook(() => useArrangement(), null)

    act(() => {
      const [, , remove] = result.current
      remove('some id which does not exist')
    })

    expect(result.current[0]).toStrictEqual({})
  })
})
