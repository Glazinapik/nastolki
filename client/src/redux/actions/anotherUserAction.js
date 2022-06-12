import * as endPoints from '../../config/endPoints';
import { SET_ANOTHER_USER } from '../types';

export const setAnotherUser = (user) => ({
    type: SET_ANOTHER_USER,
    payload: user,
  });

  export const getAnotherUserFromServer = (id) => async (dispatch) => {
    const response = await fetch(endPoints.getUser(id), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const user = await response.json();
      dispatch(setAnotherUser(user));
    }
  };

