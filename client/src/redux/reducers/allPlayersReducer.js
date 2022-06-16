import initState from "../initState";
import { SET_ALL_PLAYERS } from "../types";

const allPlayersReducer = (state = initState().allplayers, action) => {
    switch (action.type) {
      case SET_ALL_PLAYERS:
        return action.payload;
        default:
          return state;
    }
  };
  
  export default allPlayersReducer;