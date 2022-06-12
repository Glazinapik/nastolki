import * as endPoints from '../../config/endPoints';
import { GET_GAMES } from '../types';


  export const getGames = (games) => ({
    type: GET_GAMES,
    payload: games,
  });


  export const getGamesFromServer = () => async (dispatch) => {
    const response = await fetch(endPoints.getGames(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const games = await response.json();
      dispatch(getGames(games));
    }
  };


  

 
  

