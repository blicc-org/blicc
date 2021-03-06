import { renderHook, act } from '../../../tests/react-hooks'
import { useArrangement, ACTION } from '../useArrangement'

describe('useArrangement for inserting elements', () => {
  it('Insert single element into drag here', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
    })

    expect(ids[0]).toBe(result.current[0].id)
  })

  it('Insert element to the left', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.LEFT)
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'row',
      items: [
        {
          id: ids[1],
        },
        {
          id: ids[0],
        },
      ],
    })
  })

  it('Insert element to the right', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.RIGHT)
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'row',
      items: [
        {
          id: ids[0],
        },
        {
          id: ids[1],
        },
      ],
    })
  })

  it('Insert element at the top', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.TOP)
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'column',
      items: [
        {
          id: ids[1],
        },
        {
          id: ids[0],
        },
      ],
    })
  })

  it('Insert element at the bottom', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.BOTTOM)
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'column',
      items: [
        {
          id: ids[0],
        },
        {
          id: ids[1],
        },
      ],
    })
  })

  it('Insert element before element', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.BOTTOM)
      ids[2] = insert(ids[1], ACTION.BEFORE)
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'column',
      items: [
        {
          id: ids[0],
        },
        {
          id: ids[2],
        },
        {
          id: ids[1],
        },
      ],
    })
  })

  it('Insert element after element', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.BOTTOM)
      ids[2] = insert(ids[0], ACTION.AFTER)
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'column',
      items: [
        {
          id: ids[0],
        },
        {
          id: ids[2],
        },
        {
          id: ids[1],
        },
      ],
    })
  })

  it('Add four elements both row and column', () => {
    const { result }: any = renderHook(() => useArrangement(), null)
    const ids: Array<any> = []

    act(() => {
      const [arrangement, insert] = result.current
      ids[0] = insert(arrangement.id, ACTION.REPLACE)
      ids[1] = insert(ids[0], ACTION.RIGHT)
      ids[2] = insert(ids[1], ACTION.LEFT)
      ids[3] = insert(ids[2], ACTION.BOTTOM)
    })

    expect(result.current[0]).toStrictEqual({
      direction: 'row',
      items: [
        {
          id: ids[0],
        },
        {
          direction: 'row',
          items: [
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
            {
              id: ids[1],
            },
          ],
        },
      ],
    })
  })
})
