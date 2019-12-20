import {authAPI} from '../../api/Api';
import {getAuthUserData} from "./Auth-reducer";

const INITIALIZED_SUCCESS = 'my-app/App-reducer/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state;
    }
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => async (dispatch) => {
   let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export default AppReducer;