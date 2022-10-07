import Message from "../models/message.js";
import User from "../models/user.js";
import Socket from "../models/socket.js";

export const sendMessage = async (ctx) => {
  const { socket, data } = ctx;
  const { to, content } = data;
  const fromUser = await User.findOne({ username: "123" });
  const { id: tarSocketId } = await Socket.findOne({ user: to });
  //创建新消息记录
  const newMessage = await Message.create({
    from: fromUser._id,
    to,
    type: "text",
    content,
  });
  //发送给对应客户端
  socket.emit(tarSocketId, "newMessage", newMessage);
  return {
    code: 1,
    msg: "发送消息成功",
  };
};
