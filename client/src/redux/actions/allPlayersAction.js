import * as endPoints from '../../config/endPoints';
import { SET_ALL_PLAYERS } from '../types';


export const setAllPlayer = (players) => ({
    type: SET_ALL_PLAYERS,
    payload: players,
})

export const getAllPlayersFromServer = () => async (dispatch) => {
    const response = await fetch(endPoints.allplayers(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const players = await response.json();
      dispatch(setAllPlayer(players));
    }
  };