import * as endPoints from '../../config/endPoints';
import { ADD_MEETING, SET_MEETINGS } from '../types';
const { REACT_APP_API_KEY: key } = process.env;

export const setMeetings = (meetings) => ({
    type: SET_MEETINGS,
    payload: meetings,
  });

  export const addMeeting = (meeting) => ({
    type: ADD_MEETING,
    payload: meeting,
  });

  export const getMeetingsFromServer = () => async (dispatch) => {
    const response = await fetch(endPoints.getMeetings(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const meetings = await response.json();
      dispatch(getCoordsFromAddress(meetings));
    }
  };

  export const getCoordsFromAddress = (allMeetings) => async (dispatch) => {
    try {
        Promise.all(allMeetings.map(async (meeting) => {
            const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${key}&geocode=${meeting.place}`)
            const result = await response.json();
            meeting.coords = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse();
            return meeting;  
        })).then(values => {
          dispatch(setMeetings(values));
        });
    } catch (e) {
        console.log('error')
    }
}


  export const createNewMeeting = (payload, navigate) => async (dispatch) => {
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
            dispatch(addMeeting(meeting));
            navigate('/meetings');
      } catch (error) {
      navigate('/addmeeting');
    }
  };

