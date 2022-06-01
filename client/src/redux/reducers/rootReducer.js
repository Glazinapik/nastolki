import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import meetingReducer from './meetingReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    meeting: meetingReducer,
    game: gameReducer,
  });
  
export default rootReducer;
