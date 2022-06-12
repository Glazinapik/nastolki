import initState from "../initState";
import { ADD_MEETING, SET_MEETINGS } from "../types";

const meetingsReducer = (state = initState().meetings, action) => {
    switch (action.type) {
      case SET_MEETINGS:
        return action.payload;
      case ADD_MEETING:
        return [action.payload, ...state]
      default:
        return state;
    }
  };
  
  export default meetingsReducer;