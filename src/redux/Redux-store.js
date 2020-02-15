import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

import UsersReducer from './reducers/Users-reducer'
import ProfileReducer from './reducers/Profile-reducer'
import AuthReducer from './reducers/Auth-reducer'
import AppReducer from "./reducers/App-reducer";
import dialogsReduser from "./reducers/Dialogs-reduser";


let reducers = combineReducers({
    Users: UsersReducer,
    Profile: ProfileReducer,
    Auth: AuthReducer,
    App: AppReducer,
    dialogs: dialogsReduser,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;