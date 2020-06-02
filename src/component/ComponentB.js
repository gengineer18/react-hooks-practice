import React, {useContext} from 'react'
import { CountContext } from '../App'

export const ComponentB = () => {
  const countContext = useContext(CountContext)
  return (
    <div>
      <button onClick={() => countContext.countDispatch({type: 'increment1', value: 1})}>カウントアップ1</button>
      <button onClick={() => countContext.countDispatch({type: 'decrement1', value: 1})}>カウントダウン1</button>
      <button onClick={() => countContext.countDispatch({ type: 'reset' })}>リセット</button>
    </div>
  )
}
