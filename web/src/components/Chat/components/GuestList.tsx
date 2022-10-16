import React, { useEffect } from "react";
import { useGlobalContext, IVisitor } from "@/context";
import { ActionTypes } from "@/context/action";
import socket, { ISocketResult } from "@/socket";
export default function GuestList() {
  const [context, dispatch] = useGlobalContext();
  const { visitors, selectedVisitor } = context;
  const fetchOnlineVisitors = async () => {
    const res: ISocketResult = await socket.emit("getOnlineVisitors");
    const { code, data } = res || {};
    if (code === 1) {
      dispatch({
        type: ActionTypes.SetVisitors,
        payload: data,
      });
    }
  };
  const handleItemClick = (item: IVisitor) => {
    dispatch({
      type: ActionTypes.SetSelectedVisitor,
      payload: item,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      fetchOnlineVisitors();
    });
  }, []);
  return (
    <div className="guest-list">
      {visitors.map((item) => (
        <span
          key={item._id}
          onClick={() => handleItemClick(item)}
          className={item._id === selectedVisitor?._id ? "selected" : ""}
        >
          {item.username}
        </span>
      ))}
    </div>
  );
}
