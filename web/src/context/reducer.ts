import { Action, ActionTypes } from './action'

import { IState, IVisitor } from './index'
export const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case ActionTypes.SetNewVisitor: {
            const newVisitor = action.payload as IVisitor
            return {
                ...state,
                visitors: [...state.visitors, newVisitor]
            }
        }
        case ActionTypes.SetSelectedVisitor: {
            const setSelectedVisitor = action.payload as IVisitor
            return {
                ...state,
                selectedVisitor: setSelectedVisitor
            }
        }
        default:
            return state;
    }
}
