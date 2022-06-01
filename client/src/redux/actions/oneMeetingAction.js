import * as endPoints from '../../config/endPoints';
import { SET_ONE_MEETING } from '../types';

export const setOneMeeting = (meeting) => ({
    type: SET_ONE_MEETING,
    payload: meeting,
  });


   //конкретная встреча по id
   export const getOneMeeting = (id) => async (dispatch) => {
     console.log('yes')
    try {
      const response = await fetch(endPoints.getMeeting(id), {
        credentials: 'include',
      });
      const meeting = await response.json();
      dispatch(setOneMeeting(meeting));
    } catch (error) {
      console.log('ooops')
    }
  };