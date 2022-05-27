

//   const getInitState = () => {
//     const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
//     return stateFromLS || initState;
//   }
  
// export default getInitState;

const initState = () => ({
  user: null,
});


export default initState;