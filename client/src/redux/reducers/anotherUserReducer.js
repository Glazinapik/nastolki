import initState from "../initState";
import { SET_ANOTHER_USER } from "../types";

const anotherUserReducer = (state = initState().anotheruser, action) => {
    switch (action.type) {
      case SET_ANOTHER_USER:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default anotherUserReducer;