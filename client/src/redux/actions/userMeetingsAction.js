import * as endPoints from '../../config/endPoints';
import { SET_USER_MEETINGS } from '../types';


export const setUserMeetings = (meetings) => ({
    type: SET_USER_MEETINGS,
    payload: meetings,
  });


   export const getUserMeetings = (id) => async (dispatch) => {
    try {
      const response = await fetch(endPoints.getUserMeetings(id), {
        credentials: 'include',
      });
      const meetings = await response.json();
      dispatch(setUserMeetings(meetings));
    } catch (error) {
      console.log('error')
    }
  };