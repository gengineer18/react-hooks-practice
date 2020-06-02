## useCallbackとは
パフォーマンス向上のためのHook

callback関数（イベントハンドラ）をメモ化する

不要に新しく関数インスタンスを作成することを抑制し、不要な再描画を減らす
→Vueでいうcomputedみたいなもの

依存配列の要素（deps; dependency list）が変化した場合のみメモ化した値を再計算する
→やっぱりVueでいうcomputedみたいなもの

const callback = useCallback(関数, [deps])

## なぜuseCallbackを使う？
stateの変更に伴い、他のコンポーネントまで再描画されてしまうから。

## useCallback使い方
1. exportする関数コンポーネントをReact.memo()でラップ
```js
export const Count = React.memo(({text, count}) => {
  console.log('count component -', text)
  return (
    <div>
      {text}: {count}
    </div>
  )
})
```

2. useCallbackをインポート

3. 再描画して欲しくない関数に対してuseCallbackでラップする
```js
const incrementAge = useCallback(
  () => {
    setAge(age + 1)
  },
  [age],
)
```

上記の例では、ageが変更される時のみincrementAge関数が再発行される
