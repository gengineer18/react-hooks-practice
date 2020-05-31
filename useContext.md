## Contextとは
Contextは「状態」と「状態を管理するメソッド」を、propsを用いず、アプリケーション全体で取り回せるようする

propsはコンポーネント間でバケツリレーすることができるが、コードの記述量が増え、可読性が低くなる。

ContextがDataStoreの役割を果たし、propsを使わずに下層階層のコンポーネントでデータを使うことができる。

useContextはよりシンプルに上記の機能を実現するもの。

### useContextの使い方(通常のContextの使い方も)
1. App.jsにCreateContext, useStateをインポート

2. App.jsでcreateContext()

```js
export const userContext = createContext()
```

3. App.jsでstateの準備

```js
const [user, setUser] = useState({ name: 'yamada', age: 32 })
```

4. App.jsでuserContext.Providerを設定

```js
return (
  <div className="App">
    <userContext.Provider value={user}>
      <ComponentC />
    </userContext.Provider>
  </div>
);
```

5. Contextで囲まれたコンポーネントおよびその下層コンポーネントで、userのstateが使えるようになる！ 下位コンポーネントでAppで定義したContextをインポート

```js
import { userContext } from '../App'
```

6. userContext.Consumerの中でstateを参照できる。関数の引数にstateを入れること。

```js
return (
  <div>
    <userContext.Consumer>
      {
        user => {
          return <div>{user.name}</div>
        }
      }
    </userContext.Consumer>
  </div>
)
```

7. ネストすることで複数のContextを扱える

App.js
```js
return (
  <div className="App">
    <userContext.Provider value={user}>
      <languageContext.Provider value={language}>
        <ComponentC />
      </languageContext.Provider>
    </userContext.Provider>
  </div>
);
```

component.js

```jsx
<userContext.Consumer>
  {
    user => {
      return (
        <languageContext.Consumer>
          {
            language => {
              return <div>{user.name}: {language}</div>
            }
          }
        </languageContext.Consumer>
      )
    }
  }
</userContext.Consumer>
```

外側のConsumerのreturnの中にさらにConsumerを書くので冗長。。。
そこでuseContextの出番！

8. useContextをReactからインポート

component.js

```js
import React, { useContext } from 'react'
```

9. useContextの引数にApp.jsでProvideされているContextを渡す
```js
const user = useContext(userContext)
const language = useContext(languageContext)
```

10. あとはjsxに書くだけ。functionのように書く必要なし！ネスト地獄が解消されている

```jsx
<div>
  <div>{user.name}: {language}</div>
</div>
```
