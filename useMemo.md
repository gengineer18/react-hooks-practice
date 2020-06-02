## useMemoとは
パフォーマンス向上のためのHook

### useCallbackとの違い
__useCallback__
-> 関数自体をメモ化する = 返却値が関数

__useMemo__
-> 関数の結果を保持する = 返却値が値

useMemoの方がよりvue.computedに近い？

一つ重い処理があると、他の描画に影響を与えてしまう。その影響を受けないようにするためにuseMemoを使って関係のないレンダリング処理に影響を受けないようにする

## useMemoの使い方
1. useMemoをインポート

2. 重たい関数に対してuseMemoでラップ
```js
const isEven = useMemo(() => {
  let i = 0
  while (i < 200000000) i ++
  return countOne % 2 === 0
}, [countOne])
```

上記のようにすることで、countOne以外のstateに変更があってもisEvenは再実行されない。
->パフォーマンス改善に寄与できる。
