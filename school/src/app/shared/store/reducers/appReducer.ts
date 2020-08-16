import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/appActions';

export interface appReducerState {
    login: boolean,
    user?: object
}

const initialState: appReducerState = {
    login: false,
    user: {}
};

export function reducer (state = initialState, action) {
    // console.log('action', action)
    switch (action.type) {
        case ACTION_LOGOUT:
            return {
                ...state,
                login: false,
                user: null
            }
        case ACTION_LOGIN:
            return {
                ...state,
                login: true,
                user: action.payload
            }
    }
}