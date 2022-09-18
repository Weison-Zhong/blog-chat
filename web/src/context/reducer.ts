import { Action, ActionTypes } from './action'
import { IState } from './index'
export const reducer = (state: IState, action: Action): IState => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SetName: {
            return {
                ...state,
                name: payload.name
            }
        }
    }
}
