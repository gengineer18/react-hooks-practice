## useRefとは
classコンポーネントでいうCreateRefと同等

コンポーネントがレンダリングされてからUnmountされるまでの間、ミュータブルなRefオブジェクトをuseRefは生成する

-> 参照したいDOMなどを持たせたりクロージャー内で宣言された値などへアクセスする場合にuseRefを使ってアクセスできる

### useRefの使い方
#### 例1 inputに初期状態でFocusを当てる
1. useRefをReactからインポート

2. 関数コンポーネント内でuseRefを用いてrefオブジェクトを生成

```js
const inputRef = useRef(null)
```

3. refオブジェクトをinputのrefプロパティに持たせる

```js
<input type="text" ref={inputRef} />
```

4. refオブジェクトのcurrentプロパティ内にinputノードが格納され、inputフィールドにアクセスすることが可能となった。

```js
useEffect(() => {
  inputRef.current.focus()
}, [])
```

useRefによって作成されたオブジェクトはすでにcurrentプロパティを持っており、useRefによって渡された引数が初期値としてcurrentプロパティに格納されている。

#### 例2 1秒ごとにカウントアップする
1. useEffect内でsetInterval
```js
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prevCount => prevCount + 1)
  }, 1000);
  return () => {
    clearInterval(interval)
  }
}, [])
```

2. jsxでストップを作成
```js
<div>
  <h1>{count}</h1>
  <button onClick={() => clearInterval(interval)}>ストップ</button>
</div>
```

この時、変数intervalはuseEffectのローカル変数であるため、interval is not defiendとしてエラーになる

3. useRefをインポート、interval変数をrefオブジェクトに書き換え
```js
const intervalRef = useRef()
useEffect(() => {
  intervalRef.current = setInterval(() => {
    setCount(prevCount => prevCount + 1)
  }, 1000);
  return () => {
    clearInterval(intervalRef.current)
  }
}, [])
return (
  <div>
    <h1>{count}</h1>
    <button onClick={() => clearInterval(intervalRef.current)}>ストップ</button>
  </div>
)
```

intervalRefはcurrentプロパティを持つので、値は.currentに代入する
