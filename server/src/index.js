import Koa from "koa";
import { fileURLToPath } from "url";
import path from "path";
import KoaBody from "koa-body";
import http from "http";
import config from "./config.js";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { getSocketIp } from "./utils/index.js";
import SocketModel from "./models/socket.js";
import registerRoutes from "./middlewares/registerRoutes.js";
import * as userEvents from "./socketEvents/userEvent.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = new Koa();
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);
// app.use(userRouter.routes());

const socketEvents = {
  ...userEvents,
};

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

//新设备接入socket
io.on("connection", async (socket) => {
  const ip = getSocketIp(socket);
  console.log('服务端，新设备接入，IP是',ip,'id是',socket.id);
  //往socket表中插入这个新设备
  await SocketModel.create({
    id: socket.id,
    ip,
  });

  socket.on("disconnect", async () => {
    //设备离线，往socket表中删除这个设备
    await SocketModel.deleteOne({
      id: socket.id,
    });
  });
  //这里没有传统的http协议接口，而是用socket,io的事件机制派发路由
  socket.use(registerRoutes(socket, socketEvents));

});
httpServer.listen(3002, async () => {
  await SocketModel.deleteMany({}); // 删除Socket表所有历史数据
  console.log("Server is running on port 3002");
});
