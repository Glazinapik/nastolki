import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import errorReducer from './errorReducer';
import meetingsReducer from './meetingsReducer';
import oneMeetingReducer from './oneMeetingReducer';
import playersReducer from './playersReducer';
import userMeetingsReducer from './userMeetingsReducer';
import userReducer from "./userReducer";
import allPlayersReducer from './allPlayersReducer';

const rootReducer = combineReducers({
    user: userReducer,
    games: gameReducer,
    meetings: meetingsReducer,
    meeting: oneMeetingReducer,
    players: playersReducer,
    allPlayersReducer: allPlayersReducer,

    usermeetings: userMeetingsReducer,

    error: errorReducer,

  });
  
export default rootReducer;
