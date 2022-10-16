import { IVisitor, IMessage } from './index'
export enum ActionTypes {
    SetNewVisitor = 'SetNewVisitor',
    SetVisitors = 'SetVisitors',
    SetSelectedVisitor = 'SetSelectedVisitor',
    SetSocketStatus = 'SetSocketStatus'
}

// export interface SetName {
//     name: string
// };
export interface Action {
    type: ActionTypes;
    payload: null | boolean | IVisitor | IVisitor[] | IMessage;
}