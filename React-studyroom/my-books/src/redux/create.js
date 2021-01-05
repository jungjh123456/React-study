import { applyMiddleware, createStore } from "redux";
import reducer from './modules/reducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from 'redux-promise-middleware';


const store = createStore(
          reducer, 
          composeWithDevTools(applyMiddleware(thunk, promise)));

export default store;

