import {userReducer} from './reducers/user'
import {chatReducer} from './reducers/chat'
import {combineReducers}  from 'redux'


export default combineReducers({
    userReducer,
    chatReducer
})