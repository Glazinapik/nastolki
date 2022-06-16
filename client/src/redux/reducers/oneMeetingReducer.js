import initState from "../initState";
import { SET_ONE_MEETING } from "../types";


const oneMeetingReducer = (state = initState().meeting, action) => {
    switch (action.type) {
      case SET_ONE_MEETING:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default oneMeetingReducer;