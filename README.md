# ReactLaravelConnectionTest

```
git clone git@github.com:nisshimo/ReactLaravelConnectionTest.git
```

---

### Local Server(MockApi)の起動方法

`./ReactLaravelConnectionTest` 直下で、以下を実行する。

```
$ node MockApi/server.js
```

localhost:8000 でサーバーが起動します。

#### Local Server が立ち上がっているかのテスト

##### 例 1

```
curl http://localhost:8000/users
```

としたときに、以下の出力が得られたら OK です。

```
{
  "results": [
    {
      "id": 1,
      "username": "typicode"
    },
    {
      "id": 2,
      "username": "hogehoge"
    },
    {
      "id": 3,
      "username": "hogehoge"
    }
  ]
}
```

##### 例 2

```
curl http://localhost:8000/users/1
```

としたときに、以下の出力が得られたら OK です。

```
{
  "user": {
    "id": 1,
    "username": "typicode"
  }
}
```

---

### React App の動作の確認

#### セットアップ方法

```
yarn install
yarn start
```

で、React のサーバーが起動します。

#### 正しく動作しているかの確認

- `localhost:3000/users` にアクセス → ユーザー一覧ページ
- `localhost:3000/users/:id` にアクセス → ユーザー詳細ページ

が表示されれば OK です。

メニューバーには、受注/配車等が見えていると思いますが、これらは無視していただいて大丈夫です。

---

### React と Laravel の連携のテスト

`src/App.tsx`の末尾に、以下を書いています。

```
if (document.getElementById("reactApp")) {
  ReactDOM.render(<App />, document.getElementById("reactApp"));
}
```

[https://migisanblog.com/laravel-react-install/](https://migisanblog.com/laravel-react-install/)

上の記事を参照して、Laravel で App を読み込んだときに

- Api の結果を受け取って正しくレンダリングできているか？
- User 一覧の各 User を押したときに、正しく User 詳細ページに飛ぶか？

を検証していただけると助かります！
