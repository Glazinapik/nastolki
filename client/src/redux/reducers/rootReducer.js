import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import meetingReducer from './meetingReducer';
import errorReducer from './errorReducer';
import meetingsReducer from './meetingsReducer';
import oneMeetingReducer from './oneMeetingReducer';
import playersReducer from './playersReducer';
import userMeetingsReducer from './userMeetingsReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    meetings: meetingsReducer,
    meeting: oneMeetingReducer,
    players: playersReducer,

    usermeetings: userMeetingsReducer,

    error: errorReducer,

  });
  
export default rootReducer;
