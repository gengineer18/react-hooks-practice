## useReducerとは
状態管理用のフック。

useStateに代替する。
（useStateはuseReducerで内部実装されている）

useReducerは、現在のステート値とdispatch関数の2つを返す。
```js
const [state, dispatch] = useReducer(reducer, 初期値)
```
reducerはstateを更新するための関数。
dispatchはreducerを実行するための呼び出し関数

dispatch(action)で実行する。

useReducerがuseStateより好ましい場合は、複数のstateに跨がる複雑なロジックがある場合や、前のstateに基づいて次のstateの値を決める必要がある場合

## useReducerの使い方
### 単一stateの場合
1. useReducerのインポート
```js
import React, { useReducer } from 'react'
```

2. reducer関数と初期値を設定
reducer関数にはstate関数を渡し、新しいstateを返してもらう
```js
const initialState = 0
const reducer = (state, action) => {

}
```

3. reducer関数内に、inclement, decrement, reset処理を書く。
どの処理を実行するかをactionの値で判断する。

```js
const reducer = (state, action) => {
  switch(action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return initialState
    default:
      return state
  }
}
```

4. コンポーネントにuseReducerを設定
```js
export const CounterReducer = () => {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>

    </div>
  )
}
```

5. コンポーネント内でdispatch内に実行したいactionを記述。
```js
export const CounterReducer = () => {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <h1>カウント数: {count}</h1>
      <button onClick={() => dispatch('increment')}>カウントアップ</button>
      <button onClick={() => dispatch('decrement')}>カウントダウン</button>
      <button onClick={() => dispatch('reset')}>リセット</button>
    </div>
  )
}
```

### 複数stateの場合
1. 初期値の設定
```js
const initialState = {
  firstCounter: 0,
  secondCounter: 10
}
```

2. dispatchのactionの中にpayloadを含める。typeにactionを入れる
```js
<button onClick={() => dispatch({type: 'increment1', value: 1})}>カウントアップ1</button>
```

3. reducerの編集。actionにはobjectが渡ってきているので、switch文を変更。
stateが複数なのでreturnするときにspread構文でマージすることを忘れずに

```js
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

```

## useReducerとuseContextの組み合わせ
1. App.jsにcreateContextとuseReducerをインポート

2. App()にreducerを準備
```js
const [count, dispatch] = useReducer(reducer, initialState)
```

3. App.jsにContextを作ってexport
```js
export const CountContext = createContext()
```

4. Providerでコンポーネントを囲む。Providerのvalueにはstate, dispatchをオブジェクトで指定する。こうすることでコンポーネントA、B、C間でプロパティを共有することができる

```jsx
const [count, dispatch] = useReducer(reducer, initialState)
return (
  <div className="App">
    <CountContext.Provider
      value={{countState: count, countDispatch: dispatch}}
    >
      <ComponentA />
      <ComponentB />
      <ComponentC />
    </CountContext.Provider>
  </div>
);
```

5. 子コンポーネントでCountContextをインポート、useContextを使う。CountContextにdispatchを登録しているので、dispatchメソッドは以下の例だとcountContext.countDispatchになる。

```js
import { CountContext } from '../App'

export const ComponentA = () => {
  const countContext = useContext(CountContext)
  return (
    <div>
      <button onClick={() => countContext.countDispatch({type: 'increment1', value: 1})}>カウントアップ1</button>
      <button onClick={() => countContext.countDispatch({type: 'decrement1', value: 1})}>カウントダウン1</button>
      <button onClick={() => countContext.countDispatch({ type: 'reset' })}>リセット</button>
    </div>
}
```

## useReducerを使ってAPIコールする
1. App.js下準備

```js
import React, { useReducer, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const initialState = {
  loading: true,
  error: '',
  post: {}
}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
```

2. reducer関数の設定

```js
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
```

3. useEffectでAPIコール。結果をthen, catchしてdispatchを呼び出す

```js
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
```

## useState vs useReducer
講座から受け売り
||useState|useReducer|
|---|---|---|
|扱うステートの型|string,number,boolean|object,array|
|関連するステートを扱う|×|◎|
|ビジネスロジックがある|×|◎|
|ストアの種類|ローカル|グローバル|
|テスト|×|◎|

useReducerでは複数のステートを同時に更新することが容易。
reducer関数は純粋関数であるため、テストも容易に行える
