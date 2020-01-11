import { useContext } from 'react'
import { DataflowContext } from '../../context'

export function useDataflow() {
  const [dataflow, setDataflow] = useContext(DataflowContext)

  function test() {
    return 'Test'
  }

  return [test]
}
