import { combineReducers } from 'redux';
import meetingReducer from './meetingReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    meeting: meetingReducer,
  });
  
export default rootReducer;