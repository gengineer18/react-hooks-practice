import React, { createContext, useReducer } from 'react';
import './App.css';
import { ComponentA } from './component/ComponentA';
import { ComponentB } from './component/ComponentB';
import { ComponentC } from './component/ComponentC';

export const CountContext = createContext()

const initialState = {
  firstCounter: 0
}
const reducer = (state, action) => {
  switch(action.type) {
    case 'increment1':
      return { ...state, firstCounter: state.firstCounter + action.value }
    case 'decrement1':
      return { ...state, firstCounter: state.firstCounter - action.value }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function App() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <h1>カウント：{count.firstCounter}</h1>
      <CountContext.Provider
        value={{countState: count, countDispatch: dispatch}}
      >
        <ComponentA />
        <ComponentB />
        <ComponentC />
      </CountContext.Provider>
    </div>
  );
}

export default App;
