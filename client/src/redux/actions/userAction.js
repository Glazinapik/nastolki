import * as endPoints from '../../config/endPoints';
import { SET_USER, SIGNOUT_USER } from '../types';

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
      navigate('/');
    } else {
      navigate('/user/signup');
    }
  };

  //вход
  export const signIn = (payload, navigate, from) => async (dispatch) => {
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
      navigate(from);
    } else {
      navigate('/user/signin');
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
    const response = await fetch(endPoints.checkAuth(), {
      credentials: 'include',
    });
    if (response.status === 200) {
      const user = await response.json();
      dispatch(setUser(user));
    }
  };
  

  //удалить аккаунт



  //??? редактирование аккаунта - пока не поняла
//   export const editUser = (user, navigate) => async (dispatch, getState) => {
//     const {
//       user: { id: userId },
//     } = getState();
//     const response = await fetch(endPoints.editUser(userId), {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify(user),
//     });
//     if (response.status === 200) {
//       const userData = await response.json();
//       dispatch(setUser(userData));
//       navigate(`/users/${userData.id}`);
//     } else {
//       navigate.replace('/');
//     }
//   };