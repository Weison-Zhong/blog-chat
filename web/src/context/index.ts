import React, { useContext } from "react";
import { Action } from "./action";

export interface IState {
    name: string,
    visitors: string[],
    dispatch: React.Dispatch<Action>;
}
export const initialState = {
    name: 'weison',
    visitors: [],
    dispatch: () => { }
}
export const globalContext = React.createContext<IState>(initialState);

export const useGlobalContext = (): [IState, React.Dispatch<Action>] => {
    const context = useContext(globalContext);
    return [context, context.dispatch]
}