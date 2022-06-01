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
  try {
    const response = await fetch(endPoints.players(id), {
    credentials: 'include',
  });
    const players = await response.json();
    dispatch(setPlayer(players));
  } catch (error) {
    console.log('oooops')
  }
}


//создаем нового игрока(происходит при нажатии на кнопку ХОЧУ УЧАВСТВОВАТЬ)
export const createNewPlayer = (id) => async (dispatch) => {
  console.log('aaaaaaaa')
  try {
    const response = await fetch(endPoints.players(id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({id}),
      });
        const player = await response.json();
        console.log(player,'player')
        dispatch(addPlayer(player));
  } catch (error) {
  console.log('oooops')
}
};

//меняем флаг игрока с фолс на тру(когда создатель нажимает на кнопку ПРИНЯТЬ)
export const confirmPlayerFlag = (playersId, meetingId) => async (dispatch) => {
  try {
    await fetch(endPoints.players(meetingId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({playersId, meetingId}),
      });
       dispatch(confirmPlayer(playersId));
  } catch (error) {
  console.log('oooops')
}
};

//удаляем
export const deleteOnePlayer = (playersId, meetingId) => async (dispatch) => {
  try {
        await fetch(endPoints.players(meetingId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({playersId, meetingId}),
      });
        const player = {playersId, meetingId}
        dispatch(deletePlayer(player));
  } catch (error) {
  console.log('oooops')
}
};


