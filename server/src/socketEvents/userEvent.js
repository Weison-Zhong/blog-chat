import bcrypt from "bcryptjs";
import jwt from "jwt-simple";
import config from "../config.js";
import User from "../models/user.js";
import Socket from "../models/socket.js";

// 注册
export const register = async (ctx) => {
  const { socket, data } = ctx;
  const { username, password, os, browser, environment } = data;
  if (!username) {
    return "用户名不能为空";
  }
  if (!password) {
    return "密码不能为空";
  }
  const user = await User.findOne({ username });
  if (user) {
    return "该用户名已存在,请更换重试";
  }
  const salt = await bcrypt.genSalt(config.saltNum);
  const hash = await bcrypt.hash(password, salt);
  let newUser = null;
  try {
    newUser = await User.create({
      username,
      salt,
      password: hash,
      avatar: "",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return "用户名包含不支持的字符或者长度超过限制";
    }
    throw err;
  }
  const token = generateToken(newUser._id.toString());
  socket.user = newUser._id.toString();
  await Socket.updateOne(
    { id: socket.id },
    {
      user: newUser._id,
    }
  );
  return {
    _id: newUser._id,
    avatar: newUser.avatar,
    username: newUser.username,
    token,
  };
};

//账号密码登录
export const login = async (ctx) => {
  const { socket, data } = ctx;
  const { username, password, os, browser, environment } = data;
  if (!username) {
    return "用户名不能为空";
  }
  if (!password) {
    return "密码不能为空";
  }
  const user = await User.findOne({ username });
  if (!user) {
    return "该用户不存在";
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
    }
  );
  return {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
    token,
  };
};

//访客进入
export const visitorEnter = async (ctx) => {
  const { socket, data } = ctx;
  const ip = socket.ip;
  let { token } = data;
  console.log("token", token, typeof token);
  let user = null;
  //1,有token则先判断token找出已有访客
  if (token) {
    console.log("不应该");
    const testRes = jwt.decode(token, config.jwtSecret);
  console.log({testRes});
    const { expires, user: userId } = jwt.decode(token, config.jwtSecret);
    if (Date.now() > expires) {
      //若token过期了则按ip判断
      console.log('过期了吗？？？？？？？？？？？');
      user = await User.findOne({ ip });
    } else {
      user = await User.findOne({ _id: userId });
    }
  } else {
    //2，若没有token则判断ip
    // user = await User.findOne({ ip });
  }
  console.log("here?????????", user);
  if (user) {
    //已有访客重新上线
    console.log("已有访客重新上线", user);
  } else {
    console.log("else?");
    //新访客
    const total = await User.countDocuments();
    console.log({ total });
    user = await User.create({
      username: `访客${total + 1}`,
      avatar: "",
      ip,
    });
    token = generateToken(user._id.toString());
  }
  //更新这个设备socket表的user字段
  socket.user = user._id.toString();
  await Socket.updateOne(
    { id: socket.id },
    {
      user: user._id,
    }
  );
  //发送事件给管理平台
  const toUser = await User.findOne({ username: "123" });
  const tarSocket = (await Socket.find({ user: toUser._id })).map(
    (item) => item.id
  );
  socket.emit(tarSocket, "visitorEnterFromServer", user);

  return {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
    token,
  };
};

function generateToken(user) {
  return jwt.encode(
    {
      user,
      expires: Date.now() + config.tokenExpiresTime,
    },
    config.jwtSecret
  );
}
