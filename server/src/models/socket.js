import { Schema, model } from "mongoose";

const SocketSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  id: {
    type: String,
    unique: true,
    index: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  ip: String,
  os: {
    type: String,
    default: "",
  },
  browser: {
    type: String,
    default: "",
  },
  environment: {
    type: String,
    default: "",
  },
});

/**
 * Socket Model
 * 客户端socket连接信息
 */
const Socket = model("Socket", SocketSchema);

export default Socket;
