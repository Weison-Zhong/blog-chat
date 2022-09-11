import Koa from "koa";
import http from "http";
import { Server } from "socket.io";
const app = new Koa();
const httpServer = http.createServer(app.callback());
const io = new Server(httpServer);
io.on("connection", (socket) => {
  console.log("server:连接成功");
});
httpServer.listen(3002, () => {
  console.log("Server is running on port 3002");
});
