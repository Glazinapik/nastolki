import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import initState from "./initState";


// const store = createStore (
//     rootReducer,
//     getInitState(),
//     composeWithDevTools(applyMiddleware(thunk)),
//   );

//   store.subscribe(() => {
//     window.localStorage.setItem('redux', JSON.stringify(store.getState()));
//   })
  
//   export default store;


  const store = createStore (
    rootReducer,
    initState(),
    composeWithDevTools(applyMiddleware(thunk)),
  );
  
  
  export default store;