## useEffectとは？
関数コンポーネントで副作用(Side Effect)を扱う。

副作用とは、DOMの変更・API通信・変数への代入など。

useEffect内に、副作用的処理を書く、という認識でOK

クラスコンポーネントでいう以下に相当する
- componentDidMount
- componentDidUpdate
- componentDidUnmount

Vueで考えたら頻繁に使いそうなメソッド郡ですね。

## useEffectの使い方
1. コンポーネントにimport

```js
import React, { useState, useEffect } from 'react'
```

2. 関数内でuseEffectを宣言

```js
useEffect(() => {
  document.title = `クリック回数: ${count} 回`
})
```

useEffectには関数を渡す。

また、useEffectは初回render時と更新時に呼び出されるため、componentDidMountとcomponentUpdateの両方の役割を兼ねている。

### useEffectの条件設定
useEffectには第2引数に条件を渡すことで発火条件を指定できる。

以下の例では、第2引数にcountを渡しているため、countが変更された時のみuseEffectが発火する。

```js
useEffect(() => {
  document.title = `クリック回数: ${count} 回`
  console.log('render')
}, [count])
```

### useEffectでイベントリスナーを扱う
useEffectの関数内にdocument.addEventListenerを登録。

```js
useEffect(() => {
  console.log('effected')
  document.addEventListener('mousemove', getMousePosition)
}, [])
```

初回レンダリング時のみ実行したい場合、上記のように第2引数には空配列emptyArray[]を入力する。

### useEffectでunmount時の処理を書く
第1引数の関数のreturnにremoveEventListenerを含んだ関数を設定することで、componentDidUnmountと同じことができる。

```js
useEffect(() => {
  console.log('effected')
  document.addEventListener('mousemove', getMousePosition)
  return () => { document.removeEventListener('mousemove', getMousePosition) }
}, [])
```

### useEffectでのデータ取得
Mount時にAPIを叩いてデータ取得ができる。update時には発火させたくないので第2引数には[]emptyArray

```js
const fetchData = async () => {
    const response = await fetch('https://api.randomuser.me/')
    const data = await response.json()
    const [item] = data.results
    setUser(item)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
```

`const [item] = data.results`のようにitemに[]がついているのはdata.resultsが配列を返してきているから。
