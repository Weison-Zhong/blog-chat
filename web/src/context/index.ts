import React, { useContext } from "react";
import { Action } from "./action";

export interface IState {
    name: string,
    dispatch: React.Dispatch<Action>;
}
export const initialState = {
    name: 'weison',
    dispatch: () => { }
}
export const globalContext = React.createContext<IState>(initialState);

export const useGlobalContext = (): [IState, React.Dispatch<Action>] => {
    const context = useContext(globalContext);
    return [context, context.dispatch]
}