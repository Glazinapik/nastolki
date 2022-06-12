import initState from "../initState";
import { SET_USER_MEETINGS } from "../types";

const userMeetingsReducer = (state = initState().usermeetings, action) => {
    switch (action.type) {
      case SET_USER_MEETINGS:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userMeetingsReducer;