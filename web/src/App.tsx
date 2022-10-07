import { useGlobalContext } from "./context";
import Chat from "./components/Chat";
import My from "./components/My";
import Tab from "./components/Tab";
import TabItem from "./components/Tab/TabItem";
import socket from "./socket";
import { useEffect } from "react";
function App() {
  const [context, dispatch] = useGlobalContext();
  useEffect(() => {
    socket.init(context);
  }, []);
  return (
    <div className="app">
      <Tab onChange={(name: string) => console.log({ name })}>
        <TabItem name="聊天吗">
          <Chat />
        </TabItem>
        <TabItem name="我的">
          <My />
        </TabItem>
      </Tab>
    </div>
  );
}

export default App;
