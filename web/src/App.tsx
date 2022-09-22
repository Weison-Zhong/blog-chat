import { ActionTypes } from "./context/action";
import { useGlobalContext } from "./context";
import GuestList from "./components/GuestList";
import socket from "./socket";
import { useEffect } from "react";
function App() {
  const [context, dispatch] = useGlobalContext();
  console.log({ socket });
  const handleClick = () => {
    dispatch({
      type: ActionTypes.SetName,
      payload: {
        name: "change name",
      },
    });
  };
  useEffect(() => {
    socket.init(context);
  });
  return <GuestList />;
}

export default App;
