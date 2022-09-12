import { useEffect, useState } from "react";
import IO from "socket.io-client";
const socket = IO("http://localhost:3002");
socket.on("connect", () => {
  console.log("ok");
});

function App() {
  const [msg, setMsgs] = useState<Array<any>>([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState<Array<any>>([]);
useEffect(() => {
  socket.on("newUser", (data) => {
    console.log("newUser", data);
    setUserList([...userList, data.id]);
  });
  socket.on("newMsg", (data) => {
    console.log("newMsg", data);
  });
},[userList])
  const onInputChange = (e: any) => {
    const { target } = e;
    setText(target.value);
  };
  const handleUserSelected = (id:any) => {
    setUser(id);
  };
  const onSendBtnClick = () => {
    setMsgs((msgs) => [...msgs, text]);
    socket.emit(
      "sendMsgFromAdmin",
      {
        from: "admin",
        to: user,
        content: text,
      },
      (res: any) => {
        console.log({ res });
      }
    );
  };
  return (
    <div className="App">
      <div className="content">
        {msg.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <div className="input">
        <input type="text" onChange={onInputChange} value={text} />
        <button onClick={onSendBtnClick}>send</button>
      </div>

      <div className="user">当前选中用户:{user}</div>
      <ul>
        <span>用户列表</span>
        {userList.map((item) => (
          <li key={item} onClick={() => handleUserSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
