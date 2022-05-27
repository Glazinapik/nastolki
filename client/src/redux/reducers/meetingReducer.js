import initState from "../initState";
import { ADD_MEETING, SET_MEETINGS } from "../types";

const meetingReducer = (state = initState().meeting, action) => {
    switch (action.type) {
      case SET_MEETINGS:
        return action.payload;
  
      case ADD_MEETING:
        return [...state, action.payload]
  
      default:
        return state;
    }
  };
  
  export default meetingReducer;