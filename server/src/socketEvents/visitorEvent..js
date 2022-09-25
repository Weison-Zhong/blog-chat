import config from "../config.js";
import Visitor from "../models/visitor.js";
import Socket from "../models/socket.js";

//访客进入
export const visitorOnline = async (ctx) => {
  const { socket, data } = ctx;
  const ip = socket.ip;
  const { os, browser, environment } = data;
  const visitor = await Visitor.findOne({ ip });
  if (visitor) {
    //已有访客重新上线
  } else {
    //新访客
    let newVisitor = null;
    const total = await Visitor.countDocuments();
    newVisitor = await Visitor.create({
      visitorName: `访客${++total}`,
      avatar: "",
      ip,
    });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return "密码错误";
  }
  const token = generateToken(user._id.toString(), environment);
  socket.user = user._id.toString();
  await Socket.updateOne(
    { id: socket.id },
    {
      user: user._id,
      os,
      browser,
      environment,
    }
  );
  return {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
    token,
  };
};
