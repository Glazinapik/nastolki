import * as endPoints from '../../config/endPoints';
import { ADD_MEETING, SET_MEETINGS } from '../types';

export const setMeetings = (meetings) => ({
    type: SET_MEETINGS,
    payload: meetings,
  });

  export const addMeeting = (meeting) => ({
    type: ADD_MEETING,
    payload: meeting,
  });

  //все встречи
  export const getMeetingsFromServer = () => async (dispatch) => {
    const response = await fetch(endPoints.getMeetings(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const meetings = await response.json();
      dispatch(setMeetings(meetings));
    }
  };

  //добавление новой встречи
  export const createNewMeeting = (payload, navigate) => async (dispatch) => {
    const response = await fetch(endPoints.addMeeting(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (response.status === 200) {
      const meeting = await response.json();
      dispatch(addMeeting(meeting));
      navigate('/meetings');
    } else {
      navigate('/addmeeting');
    }
  };

