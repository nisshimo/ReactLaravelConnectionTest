const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("MockApi/db.json");
const middlewares = jsonServer.defaults();

// ミドルウェアの設定 (コンソール出力するロガーやキャッシュの設定など)
server.use(middlewares);

server.use(function (req, res, next) {
  if (req.method === "POST") {
    // POST送信を受ける場合、受けたPOSTレスポンスをGETに変更する
    req.method = "GET";
  } else {
    req.query = req.params;
    req.params = null;
  }

  next();
});

const fs = require("fs");
const db = JSON.parse(fs.readFileSync("MockApi/db.json", "UTF-8"));

server.get("/users", (req, resp) => {
  const users = db.users;
  resp.status(200).json({ results: users });
});

server.get("/users/:id", (req, resp) => {
  const id = req.params.id;
  const user = db.users.find((blog) => blog.id === Number(id));
  resp.status(200).json({ user });
});
// db.json をもとにデフォルトのルーティングを設定する
server.use(router);

server.listen(8000, () => {
  console.log("JSON Server is running");
});
