import { combineReducers } from 'redux';
import meetingsReducer from './meetingsReducer';
import oneMeetingReducer from './oneMeetingReducer';
import playersReducer from './playersReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    meetings: meetingsReducer,
    meeting: oneMeetingReducer,
    players: playersReducer,
  });
  
export default rootReducer;