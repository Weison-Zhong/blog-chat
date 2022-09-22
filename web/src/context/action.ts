export enum ActionTypes {
    SetName = 'SetName',
    SetNewVisitor = 'SetNewVisitor'
}

export interface SetName {
    name: string
};

export interface SetNewVisitorPayload {
    newVisitor: string
};

export interface Action {
    type: ActionTypes;
    payload: SetName | SetNewVisitorPayload;
}