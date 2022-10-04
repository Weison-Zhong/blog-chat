import Message from "../models/message";
import User from "../models/user.js";
import Socket from "../models/socket.js";

export const sendMessage = async (ctx) => {
  const { socket, data } = ctx;
  const { to, content } = data;
  const toUser = await User.findOne({ _id: to });
  const fromUser = await User.findOne({ username: "123" });
  const message = await Message.create({
    from: fromUser._id,
    to: toUser._id,
    type: "text",
    content,
  });
  
};
