import * as endPoints from '../../config/endPoints';
import { SET_USER, SIGNOUT_USER } from '../types';
import axios from 'axios';
import { showError } from './errorsAction';
axios.defaults.withCredentials=true
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
  });

  export const signOutUser = () => ({
    type: SIGNOUT_USER,
  });


  //получить юзера
  export const getUserFromServer = (id) => async (dispatch) => {
    const response = await fetch(endPoints.getUser(id), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const currentUser = await response.json();
      dispatch(setUser(currentUser));
    }
  };


  //регистрация
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

  //вход
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

  //выйти из аккаунта
  export const signOut = () => async (dispatch) => {
    const response = await fetch(endPoints.signOut(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      dispatch(signOutUser());
    }
  };


  //чекаем
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
  

  //удалить аккаунт



  //??? редактирование аккаунта - пока не поняла
  export const editUser = (user, navigate) => async (dispatch) => {
    const file = new FormData();
    for(let key in user) file.append(key, user[key]);
    console.log(file.get('file'), '<1111111111111111');

    const response = await axios.patch(endPoints.editUser(user.id),file,{
      headers: {
            'Content-Type': 'multipart/form-data',
          },
    })
    if(response.statusText == 'OK'){
      const userData = response.data;
      dispatch(setUser(userData));
      //navigate(`/users/${userData.id}`);
    } else {
      //navigate('/');
    }
  };
