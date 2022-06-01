import initState from "../initState";
import { SIGN_IN_ERROR } from "../types";

const errorReducer = (state = initState().error, action) => {
    switch (action.type) {
      case SIGN_IN_ERROR:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default errorReducer;
