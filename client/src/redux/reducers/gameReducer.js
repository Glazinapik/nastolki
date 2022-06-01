import initState from "../initState";
import { GET_GAMES} from "../types";

const gameReducer = (state = initState().games, action) => {
    switch (action.type) {
      case GET_GAMES:
        return action.payload;
    default:
        return state;
    }
  };
  
  export default gameReducer;
