import { ActionTypes } from "./context/action";
import { useGlobalContext } from "./context";
import GuestList from "./components/GuestList";
import Chat from './components/Chat'
import socket from "./socket";
import { useEffect, useState } from "react";
function App() {
  const [context, dispatch] = useGlobalContext();
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
  useEffect(() => {
    socket.init(context);
  },[]);
  return (
    <div className="app">
      <span>用户名</span>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <span>密码</span>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLoginBtnClick}>登录</button>
      <button onClick={handleRegiserBtnClick}>注册</button>
      <GuestList />
      <Chat />
    </div>
  );
}

export default App;
