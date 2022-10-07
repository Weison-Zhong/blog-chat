import { useGlobalContext } from "@/context";
import React from "react";
import ChatDialog from "./components/ChatDialog";
import GuestList from "./components/GuestList";
import './index.less'
export default function Chat() {
  const [context, dispatch] = useGlobalContext();
  const { selectedVisitor } = context;
  return selectedVisitor ? <ChatDialog /> : <GuestList />;
}
