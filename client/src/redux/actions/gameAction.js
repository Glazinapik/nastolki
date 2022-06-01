import * as endPoints from '../../config/endPoints';
import { GET_GAMES } from '../types';


// export const setMeetings = (meetings) => ({
//     type: SET_MEETINGS,
//     payload: meetings,
//   });

  export const getGames = (games) => ({
    type: GET_GAMES,
    payload: games,
  });

  // все встречи
  // export const getMeetingsFromServer = () => async (dispatch) => {
  //   const response = await fetch(endPoints.getMeetings(), {
  //     credentials: 'include',
  //   });
  //   if (response.status === 200) {
  //     const meetings = await response.json();
  //     dispatch(setMeetings(meetings));
  //   }
  // };

  // все встречи
  export const getGamesFromServer = () => async (dispatch) => {
    const response = await fetch(endPoints.getGames(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const games = await response.json();
      dispatch(getGames(games));
    }
  };


  

 
  

