import React from "react";
import { useGlobalContext, IVisitor } from "@/context";
import { ActionTypes } from "@/context/action";

export default function GuestList() {
  const [context, dispatch] = useGlobalContext();
  const { visitors, selectedVisitor } = context;
  const handleItemClick = (item: IVisitor) => {
    dispatch({
      type: ActionTypes.SetSelectedVisitor,
      payload: item,
    });
  };
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
