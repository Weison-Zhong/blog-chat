import React, { useState } from "react";
import socket from "@/socket";
import { useGlobalContext, IMessage } from "@/context";
import { ActionTypes } from "@/context/action";
export default function Chat() {
  const [inputText, setInputText] = useState("");
  const [context, dispatch] = useGlobalContext();
  const { selectedVisitor } = context;
  const handleSendMsgBtnClick = async () => {
    const newMsg: IMessage = {
      id: Date.now().toString(),
      content: inputText,
      to: selectedVisitor!._id,
    };
    // dispatch({
    //   type: ActionTypes.SetNewMessage,
    //   payload: newMsg,
    // });

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
      </ul>
    </div>
  );
}
