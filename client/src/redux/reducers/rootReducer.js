import { combineReducers } from 'redux';
import meetingsReducer from './meetingsReducer';
import oneMeetingReducer from './oneMeetingReducer';
import playersReducer from './playersReducer';
import userMeetingsReducer from './userMeetingsReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    meetings: meetingsReducer,
    meeting: oneMeetingReducer,
    players: playersReducer,
    usermeetings: userMeetingsReducer,
  });
  
export default rootReducer;