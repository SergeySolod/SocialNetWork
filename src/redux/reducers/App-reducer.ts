import {getAuthUserData} from "./Auth-reducer";

const INITIALIZED_SUCCESS = 'my-app/App-reducer/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,
}

const AppReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS //INITIALIZED_SUCCESS
}

const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => async (dispatch: any) => {
   let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export default AppReducer;