import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import errorReducer from './errorReducer';
import meetingsReducer from './meetingsReducer';
import oneMeetingReducer from './oneMeetingReducer';
import playersReducer from './playersReducer';
import userMeetingsReducer from './userMeetingsReducer';
import userReducer from "./userReducer";
import allPlayersReducer from './allPlayersReducer';
import themesReducer from './themesReduces';
import anotherUserReducer from './anotherUserReducer';


const rootReducer = combineReducers({
    user: userReducer,
    anotheruser: anotherUserReducer,
    games: gameReducer,
    meetings: meetingsReducer,
    meeting: oneMeetingReducer,
    players: playersReducer,
    allPlayersReducer: allPlayersReducer,
    themes: themesReducer,
    usermeetings: userMeetingsReducer,
    error: errorReducer,
  });
  
export default rootReducer;
