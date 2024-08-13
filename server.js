//메인 서버 파일

const express = require("express");
const http = require("http");
const loaders = require("./src/loaders");
const socketLoader = require("./src/loaders/socket");

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  await loaders(app); //익스프레스 로더 호출
  socketLoader(server);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
