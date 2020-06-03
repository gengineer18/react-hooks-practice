1. componentフォルダと同階層にhooksフォルダを作成

2. useHogehogeファイルを作成。この時、useというプレフィックスをつけるのがデファクト

3. 共通処理をカスタムフックに書く
```jsx
import { useEffect } from 'react'

export const useDocumentTitle = (count) => {
  useEffect(() => {
    document.title = `カウント ${count}`
  }, [count])
}

```

4. コンポーネントでカスタムフックを読み込む
```jsx
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const DocTitleUpdateOne = () => {
  const [count, setCount] = useState(0)
  useDocumentTitle(count)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        count {count}
      </button>
    </div>
  )
}
```

要は共通ロジックの切り出しをして、共通ロジックをまとめて書くだけの話
