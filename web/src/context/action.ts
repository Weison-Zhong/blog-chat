import { IVisitor } from './index'
export enum ActionTypes {
    SetNewVisitor = 'SetNewVisitor',
    SetSelectedVisitor = 'SetSelectedVisitor'
}

// export interface SetName {
//     name: string
// };
export interface Action {
    type: ActionTypes;
    payload: IVisitor;
}