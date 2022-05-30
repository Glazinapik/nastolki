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

  //конкретная встреча по id
  export const getOneMeeting = (id) => async (dispatch) => {
    console.log(id, '<-----------')
    try {
      const response = await fetch(endPoints.getMeeting(id), {
        credentials: 'include',
      });
      const meeting = await response.json();
      dispatch(setMeetings(meeting));
    } catch (error) {
      console.log('ooops')
    }
  };

  //добавление новой встречи
  export const createNewMeeting = (payload, navigate) => async (dispatch) => {
      console.log(payload)
      try {
        const response = await fetch(endPoints.addMeeting(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload),
          });
            const meeting = await response.json();
            console.log(meeting)
            dispatch(addMeeting(meeting));
            navigate('/meetings');

      } catch (error) {
      navigate('/addmeeting');
    }
  };

