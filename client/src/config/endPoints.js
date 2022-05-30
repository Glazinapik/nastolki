const { REACT_APP_HOST: host } = process.env;

export const signUp = () => `${host}/user/signup`;
export const signIn = () => `${host}/user/signin`;
export const signOut = () => `${host}/user/signout`;
export const checkAuth = () => `${host}/user/check`;

export const editUser = (id) => `${host}/users/${id}`;
export const deleteUser = (id) => `${host}/users/${id}`;
export const getUser = (id) => `${host}/users/${id}`;

export const getMeetings = () => `${host}/meeting/all`;
export const addMeeting = () => `${host}/meeting/`;
export const getMeeting = (id) => `${host}/meeting/${id}`;