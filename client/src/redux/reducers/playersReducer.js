import initState from "../initState";
import { ADD_PLAYER, CONFIRM_PLAYER, DELETE_PLAYER, SET_PLAYERS } from "../types";


const playersReducer = (state = initState().players, action) => {
    switch (action.type) {
      case SET_PLAYERS:
        return action.payload;
      case ADD_PLAYER:
        return [...state, action.payload];
        case CONFIRM_PLAYER:
          return [...state.map((player) => player.id === Number(action.payload)? {...player, flag: !player.flag} : {...player})];
        case DELETE_PLAYER:
          return [...state.map((player) => player.id === Number(action.payload)? {...player, flag: null} : {...player})];
        default:
          return state;
    }
  };
  
  export default playersReducer;