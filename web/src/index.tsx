import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ReactNode, useReducer } from "react";
import { reducer } from "./context/reducer";
import { initialState, globalContext } from "./context";
interface IProps {
  children: ReactNode;
}
const ContextWrapper: React.FC<IProps> = ({ children }) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return (
    <globalContext.Provider value={{ ...globalState, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ContextWrapper>
    <App />
  </ContextWrapper>
);