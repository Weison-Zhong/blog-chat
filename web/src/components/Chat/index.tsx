import React, { useState } from "react";
import socket from "@/socket";
import { useGlobalContext } from "@/context";
export interface IMessage {
  id: string;
  to: string;
  content: string;
}
export default function Chat() {
  const [inputText, setInputText] = useState("");
  const [msgList, setMsgList] = useState<IMessage[]>([]);
  const [context, dispatch] = useGlobalContext();
  const { selectedVisitor } = context;
  const handleSendMsgBtnClick = async () => {
    const newMsg: IMessage = {
      id: Date.now().toString(),
      content: inputText,
      to: selectedVisitor!._id,
    };
    setMsgList((oldMsg) => [...oldMsg, newMsg]);

    const res = await socket.emit("sendMessage", newMsg);
    console.log("newMsg cb", res);
  };
  return (
    <div className="chat">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSendMsgBtnClick}>发送</button>
      <ul>
        {msgList.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>

    </div>
  );
}
