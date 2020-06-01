import React, { useReducer } from 'react'

const initialState = {
  firstCounter: 0,
  secondCounter: 10
}
const reducer = (state, action) => {
  switch(action.type) {
    case 'increment1':
      return { ...state, firstCounter: state.firstCounter + action.value }
    case 'decrement1':
      return { ...state, firstCounter: state.firstCounter - action.value }
    case 'increment2':
      return { ...state, secondCounter: state.secondCounter + action.value }
    case 'decrement2':
      return { ...state, secondCounter: state.secondCounter - action.value }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export const CounterReducer = () => {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <h1>カウント1: {count.firstCounter}</h1>
      <h1>カウント2: {count.secondCounter}</h1>
      <button onClick={() => dispatch({type: 'increment1', value: 1})}>カウントアップ1</button>
      <button onClick={() => dispatch({type: 'decrement1', value: 1})}>カウントダウン1</button>
      <button onClick={() => dispatch({type: 'increment2', value: 10})}>カウントアップ2</button>
      <button onClick={() => dispatch({type: 'decrement2', value: 10})}>カウントダウン2</button>
      <button onClick={() => dispatch({ type: 'reset' })}>リセット</button>
    </div>
  )
}
