import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import meetingsReducer from './meetingsReducer';
import oneMeetingReducer from './oneMeetingReducer';
import playersReducer from './playersReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    meetings: meetingsReducer,
    meeting: oneMeetingReducer,
    players: playersReducer,
    error: errorReducer,
  });
  
export default rootReducer;
