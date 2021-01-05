import {combineReducers} from 'redux';
import books from './books';
import auth from './auth';

const reducer = combineReducers({
  books,
  auth,
});

export default reducer;