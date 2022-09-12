import Koa from "koa";
import http from "http";
import { Server } from "socket.io";
const app = new Koa();
const httpServer = http.createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
  pingTimeout: 10000,
  pingInterval: 5000,
});
let count = 1;
let adminId = null;
io.on("connection", (socket) => {
  const { id } = socket;
  console.log("server:连接成功", id);
  !adminId &&  (adminId = id);
  console.log({adminId});
  socket.to(adminId).emit("newUser", {
    id: socket.id,
    num: count,
  });
  count++;
  socket.on("sendMsgFromClient", function (data, cb) {
    const { content } = data;
    socket.to(adminId).emit("newMsg", {
      from:id,
      content,
    });
  });
  socket.on("sendMsgFromAdmin", function (data, cb) {
    console.log({ data });
    const { from, to, content } = data;
    socket.to(to).emit("newMsg", {
      from,
      content,
    });
  });
});
httpServer.listen(3002, () => {
  console.log("Server is running on port 3002");
});
