import * as endPoints from '../../config/endPoints';
import { ADD_PLAYER, DELETE_PLAYER, SET_FALSE_PLAYERS } from '../types';

export const setFalsePlayers = (players) => ({
    type: SET_FALSE_PLAYERS,
    payload: players,
  });

  export const addPlayer = (player) => ({
    type: ADD_PLAYER,
    payload: player,
})

export const addPlayer = (players) => ({
    type: ADD_PLAYER,
    payload: players,
})

export const deletePlayer = (players) => ({
    type: DELETE_PLAYER,
    payload: players,
})

export const getFalsePlayers = () => async (dispatch) => {
    const response = await fetch(endPoints.getFalsePlayers(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const players = await response.json();
      dispatch(setFalsePlayers(players));
    }
  };

  export const addNewPlayer = () => async (dispatch) => {
    const {
        players: { user_id: user_id,  meeting_id: meeting_id},
        } = getState(); 
    const response = await fetch(endPoints.addNewPlayer, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(user_id, meeting_id),
            });
    if (response.status === 200) {
      const players = await response.json();
      dispatch(setFalsePlayers(players));
    }
  };


export const createNewPlayer = (payload) => async (dispatch) => {
    try {
      const response = await fetch(endPoints.createNewPlayer(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
          const player = await response.json();
          dispatch(addPlayer(player));
    } catch (error) {
        console.log('ooops')
  }
};