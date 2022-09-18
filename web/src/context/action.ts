export enum ActionTypes {
    SetName = 'SetName'
}

export type SetName = {
    name: string
};

export interface Action {
    type: ActionTypes;
    payload: SetName;
}