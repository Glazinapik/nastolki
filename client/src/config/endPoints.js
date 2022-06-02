const { REACT_APP_HOST: host } = process.env;

export const signUp = () => `${host}/auth/signup`;
export const signIn = () => `${host}/auth/signin`;
export const signOut = () => `${host}/auth/signout`;
export const checkAuth = () => `${host}/auth/check`;

export const editUser = (id) => `${host}/users/${id}`;
export const deleteUser = (id) => `${host}/users/${id}`;
export const getUser = (id) => `${host}/users/${id}`;

export const getMeetings = () => `${host}/meeting/all`;
export const addMeeting = () => `${host}/meeting/`;

export const getGames = () => `${host}/games/all`;
export const getMeeting = (id) => `${host}/meeting/${id}`;

export const players = (id) => `${host}/players/${id}`; //передаю айди встречи
export const allplayers = (id) => `${host}/players/all`; 

export const getUserMeetings = (id) => `${host}/meeting/user/${id}`;
