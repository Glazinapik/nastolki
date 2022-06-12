import initState from "../initState";
import { SET_USER, SIGNOUT_USER } from "../types";

  const userReducer = (state = initState().user, action) => {
    switch (action.type) {
      case SET_USER:
        return action.payload;
      case SIGNOUT_USER:
        return null;
      default:
        return state;
    }
  };
  
  export default userReducer;