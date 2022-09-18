import { ActionTypes } from "./context/action";
import { useGlobalContext } from "./context";
function App() {
  const [context, dispatch] = useGlobalContext();
  const handleClick = () => {
    dispatch({
      type: ActionTypes.SetName,
      payload: {
        name: "change name",
      },
    });
  };
  return <span onClick={handleClick}>name: {context?.name}</span>;
}

export default App;
