import React, { useReducer, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const initialState = {
  loading: true,
  error: '',
  post: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        post: action.payload,
        error: ''
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        post: {},
        error: 'データの取得に失敗しました'
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => {
        dispatch({type: 'FETCH_SUCCESS', payload: res.data})
      })
      .catch(res => {
        dispatch({ type: 'FETCH_ERROR'})
      })
  })

  return (
    <div className="App">
      <h1>{state.loading ? 'Loading...' : state.post.title}</h1>
      <h2>{state.error ? state.error : null}</h2>
    </div>
  );
}

export default App;
