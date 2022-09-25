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
      os,
      browser,
      environment,
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

//访客进入
export const visitorOnline = async (ctx) => {
  const { socket, data } = ctx;
  const ip = socket.ip;
  const { os, browser, environment } = data;
  let user = await User.findOne({ ip });
  if (user) {
    //已有访客重新上线
    console.log("user", user);
  } else {
    //新访客

    const total = await User.countDocuments();
    try {
      user = await User.create({
        username: `访客${total + 1}`,
        avatar: "",
        ip,
      });
    } catch (err) {
      console.log(err);
    }
  }
  socket.user = user._id.toString();
  await Socket.updateOne(
    { id: socket.id },
    {
      user: user._id,
      os,
      browser,
      environment,
      lastLoginTime: Date.now,
    }
  );
  return {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
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
