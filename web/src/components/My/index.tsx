import React, { useState } from "react";
import "./index.less";
import socket from "@/socket";

export default function My() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLoginBtnClick = async () => {
    const res = await socket.emit("login", {
      username,
      password,
    });
    console.log(res);
  };
  const handleRegiserBtnClick = () => {
    socket.emit("register", {
      username,
      password,
    });
  };
  return (
    <div>
      <span>用户名</span>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <span>密码</span>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLoginBtnClick}>登录</button>
      <button onClick={handleRegiserBtnClick}>注册</button>
    </div>
  );
}
