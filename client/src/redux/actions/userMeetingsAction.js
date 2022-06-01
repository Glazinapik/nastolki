import * as endPoints from '../../config/endPoints';
import { SET_USER_MEETINGS } from '../types';


export const setUserMeetings = (meetings) => ({
    type: SET_USER_MEETINGS,
    payload: meetings,
  });


   //встречи по id юзера
   export const getUserMeetings = (id) => async (dispatch) => {
     console.log('yes')
    try {
      const response = await fetch(endPoints.getUserMeetings(id), {
        credentials: 'include',
      });
      const meetings = await response.json();
      dispatch(setUserMeetings(meetings));
    } catch (error) {
      console.log('ooops')
    }
  };