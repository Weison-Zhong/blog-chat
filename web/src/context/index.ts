import React, { useContext } from "react";
import { Action } from "./action";


export interface IVisitor {
    _id: string,
    username: string,
}

export interface IMessage {
    id: string;
    to: string;
    content: string;
}

export interface IState {
    name: string,
    visitors: IVisitor[],
    selectedVisitor: null | IVisitor,
    isSocketReady: boolean,
    dispatch: React.Dispatch<Action>;
}
export const initialState = {
    name: 'weison',
    visitors: [],
    selectedVisitor: null,
    isSocketReady: false,
    dispatch: () => { }
}
export const globalContext = React.createContext<IState>(initialState);

export const useGlobalContext = (): [IState, React.Dispatch<Action>] => {
    const context = useContext(globalContext);
    return [context, context.dispatch]
}