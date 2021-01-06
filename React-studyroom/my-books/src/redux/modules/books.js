import BookService from "../../services/BookService";
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from "redux-actions";

// namespace
const prefix = 'fds17-my-books/books';

const {start,success, fail} = createActions('START', 'SUCCESS', 'FAIL', { prefix });

// initial state
const initialState = {books: [], loading: false, error: null}; // 초기값 설정

// reducer
const books = handleActions({
  START: (state, action) => ({...state, loading: true, error: null}),
  SUCCESS: (state, action) => ({books: action.payload, loading: false, error: null}),
  FAIL: (state, action) => ({...state, loading: false, error: action.payload}),
}, initialState, {prefix})
export default books;



const BOOKS_SAGA = prefix + '/BOOKS_SAGA';

// saga
function* getBooksSaga() {
  // 로직
  try {
    yield put(start());
    // dispatch(bookStart()); // 로딩이 돌기 시작
    yield delay(2000);
    // await sleep(2000);
    // getState는 전체 스테이트
    
    // const books = await BookService.getBooks(getState().auth.token);
    const token = yield select(state => state.auth.token);
    const books = yield call(BookService.getBooks, token); 
    
    // dispatch(bookSuccess(books));
    yield put(success(books));

  }catch (error) {
    // dispatch(bookFail(error));
    yield put(fail(error));
  }
}

export const getBooksSagaStart = createAction(BOOKS_SAGA);
// export const getBooksSagaStart = () => ({type: BOOKS_SAGA});

export function* booksSaga() {
  yield takeEvery(BOOKS_SAGA, getBooksSaga);
}