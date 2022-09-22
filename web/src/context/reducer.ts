import { Action, ActionTypes, SetNewVisitorPayload } from './action'
import { IState } from './index'
export const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case ActionTypes.SetName: {
            return {
                ...state,
                name: 'test'
            }
        }
        case ActionTypes.SetNewVisitor: {
            const payload = action.payload as SetNewVisitorPayload
            return {
                ...state,
                visitors: [...state.visitors, payload.newVisitor]
            }
        }
        default:
            return state;
    }
}
