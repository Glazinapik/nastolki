import * as endPoints from '../../config/endPoints';
import { SET_USER, SIGNOUT_USER } from '../types';
import axios from 'axios';
import { showError } from './errorsAction';

axios.defaults.withCredentials = true;

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
  });

  export const signOutUser = () => ({
    type: SIGNOUT_USER,
  });


  export const getUserFromServer = (id) => async (dispatch) => {
    const response = await fetch(endPoints.getUser(id), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const currentUser = await response.json();
      dispatch(setUser(currentUser));
    }
  };


  export const signUp = (payload, navigate) => async (dispatch) => {
    const response = await fetch(endPoints.signUp(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (response.status === 200) {
      const user = await response.json();
      dispatch(setUser(user));
      navigate('/meetings');
    } else {
      navigate('/user/signup');
    }
  };


  export const signIn = (payload,navigate) => async (dispatch) => {
    const response = await fetch(endPoints.signIn(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    if (response.status === 200) {
      const user = await response.json();
      dispatch(setUser(user));
      dispatch(showError(null));
      navigate('/meetings')
    }else{
      dispatch(showError("ошибка"));
    }
  };

  
  export const signOut = () => async (dispatch) => {
    const response = await fetch(endPoints.signOut(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      dispatch(signOutUser());
    }
  };



  export const checkAuth = () => async (dispatch) => {
    try {
      const response = await fetch(endPoints.checkAuth(), {
        credentials: 'include',
      });
        const user = await response.json();
        dispatch(setUser(user));  
    } catch (error) {
      dispatch(setUser('noUser')); 
    }
    
  };
  

  export const editUser = (user, navigate) => async (dispatch) => {
    const file = new FormData();
    for(let key in user) file.append(key, user[key]);
    const response = await axios.patch(endPoints.editUser(user.id),file,{
      headers: {
            'Content-Type': 'multipart/form-data',
          },
    })
    if(response.statusText == 'OK'){
      const userData = response.data;
      dispatch(setUser(userData));
    } 
  };
