import initState from "../initState";
import { GET_THEMES} from "../types";

const themesReducer = (state = initState().themes, action) => {
    switch (action.type) {
      case GET_THEMES:
        return action.payload;
    default:
        return state;
    }
  };
  
export default themesReducer;
