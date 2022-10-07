import { Action, ActionTypes } from './action'

import { IState, IVisitor, IMessage } from './index'
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
            const selectedVisitor = action.payload as IVisitor | null
            return {
                ...state,
                selectedVisitor
            }
        }
        case ActionTypes.SetSocketStatus: {
            return {
                ...state,
                isSocketReady: action.payload as boolean
            }
        }
        default:
            return state;
    }
}
