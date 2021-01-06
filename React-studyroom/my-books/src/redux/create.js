import { applyMiddleware, createStore } from "redux";
import reducer from './modules/reducer';
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./modules/saga";

const create = (history) => {
      const sagaMiddleware = createSagaMiddleware();
      const store =  createStore(
          reducer(history), 
          {
            auth: {
              token:localStorage.getItem('token'),
              loading: false,
              error: null},
          },
          composeWithDevTools(applyMiddleware(
           routerMiddleware(history),
          sagaMiddleware
          )
        )
      )
    sagaMiddleware.run(rootSaga);

    return store;
};
export default create;

