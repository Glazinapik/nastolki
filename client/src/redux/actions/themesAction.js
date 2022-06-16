import * as endPoints from '../../config/endPoints';
import { GET_THEMES } from '../types';

  export const getThemes = (themes) => ({
    type: GET_THEMES,
    payload: themes,
  });

 
  export const getThemesFromServer = () => async (dispatch) => {
    const response = await fetch(endPoints.getThemes(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const themes = await response.json();
    
      dispatch(getThemes(themes));
    }
  };
