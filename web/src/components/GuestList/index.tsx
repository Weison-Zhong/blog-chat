import React from "react";
import { useGlobalContext } from "../../context";
export default function GuestList() {
  const [context, dispatch] = useGlobalContext();
  return <div>{context.visitors}</div>;
}
