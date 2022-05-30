import * as endPoints from '../../config/endPoints';
import { ADD_PLAYER, CONFIRM_PLAYER, DELETE_PLAYER, SET_PLAYERS } from '../types';

export const setPlayer = (players) => ({
    type: SET_PLAYERS,
    payload: players,
})

export const addPlayer = (player) => ({
    type: ADD_PLAYER,
    payload: player,
})

export const confirmPlayer = (player) => ({
  type: CONFIRM_PLAYER,
  payload: player,
})

export const deletePlayer = (player) => ({
  type: DELETE_PLAYER,
  payload: player,
})

//получаем всех игроков данной встречи
export const getPlayersFromServer = (id) => async (dispatch) => {
  const response = await fetch(endPoints.players(id), {
    credentials: 'include',
  });
  if (response.status === 200) {
    const players = await response.json();
    dispatch(setPlayer(players));
  }
};

//создаем нового игрока(происходит при нажатии на кнопку ХОЧУ УЧАВСТВОВАТЬ)
export const createNewPlayer = (id) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.players(id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(id),
      });
        const player = await response.json();
        dispatch(addPlayer(player));
  } catch (error) {
  console.log('oooops')
}
};

//меняем флаг игрока с фолс на тру(когда создатель нажимает на кнопку ПРИНЯТЬ)
export const confirmPlayerFlag = (user_id, meeting_id) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.players(meeting_id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({user_id, meeting_id}),
      });
        const confirmedPlayer = await response.json();
        dispatch(confirmPlayer(confirmedPlayer));
  } catch (error) {
  console.log('oooops')
}
};

//удаляем
export const deleteOnePlayer = (user_id, meeting_id) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.players(meeting_id), {
        method: 'DELETE',
        credentials: 'include',
      });
        dispatch(deletePlayer(user_id));
  } catch (error) {
  console.log('oooops')
}
};


