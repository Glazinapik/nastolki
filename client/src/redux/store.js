import { applyMiddleware, legacy_createStore as createStore } from "redux";
import initState from "./initState";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';


const store = createStore (
    rootReducer,
    initState(),
    composeWithDevTools(applyMiddleware(thunk)),
  );
  
  export default store;