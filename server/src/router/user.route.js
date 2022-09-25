import Router from "koa-router";
import bcrypt from "bcryptjs";
import assert, { AssertionError } from "assert";
import jwt from "jwt-simple";
import config from "../config.js";
import User from "../models/user.js";


const router = new Router({ prefix: "/users" });
// GET /
//   users /
//   router.get("/", (ctx, next) => {
//     ctx.body = "hello users";
//   });

// 注册接口
// router.post("/register", async (ctx, next) => {
//   const { username, password } = ctx.request.body;
//   assert(username, "用户名不能为空");
//   assert(password, "密码不能为空");
//   const user = await User.findOne({ username });
//   assert(!user, "该用户名已存在");
//   const salt = await bcrypt.genSalt(config.saltNum);
//   const hash = await bcrypt.hash(password, salt);
//   let newUser = null;
//   try {
//     newUser = await User.create({
//       username,
//       salt,
//       password: hash,
//       avatar: "",
//     });
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       return "用户名包含不支持的字符或者长度超过限制";
//     }
//     throw err;
//   }
// });

// 登录接口
// router.post("/login", async (ctx, next) => {
//   const { username, password } = ctx.data;
//   assert(username, "用户名不能为空");
//   assert(password, "密码不能为空");

//   const user = await User.findOne({ username });
//   if (!user) {
//     throw new AssertionError({ message: "该用户不存在" });
//   }

//   const isPasswordCorrect = bcrypt.compareSync(password, user.password);
//   assert(isPasswordCorrect, "密码错误");
//   ctx.body = "登录成功";
// });

export default router;

export const register = async (socket,data) => {
  console.log('in cb',socket,data);
  return
  const { username, password } = ctx.data;
  assert(username, "用户名不能为空");
  assert(password, "密码不能为空");

  const user = await User.findOne({ username });
  if (!user) {
    throw new AssertionError({ message: "该用户不存在" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  assert(isPasswordCorrect, "密码错误");
  ctx.body = "登录成功";
};
