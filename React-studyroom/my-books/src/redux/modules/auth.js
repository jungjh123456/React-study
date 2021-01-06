import { push } from "connected-react-router";
import { createActions, handleActions } from "redux-actions";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import AuthService from "../../services/AuthService";

// namespace
const prefix = 'fds17-my-books/auth';

// action types
const {start, success, fail} = createActions('START', 'SUCCESS', 'FAIL', { prefix });

// initial state
const initialState = { token: null, loading: false, error: null }; // 초기값 설정

// reducer
const auth = handleActions(
  {
  START: () => ({token: null, loading: true, error: null}),
  SUCCESS: (state, action) => ({
    token: action.payload, 
    loading: false, 
    error: null}),
  FAIL: (state, action) => ({
    token: null, 
    loading: false, 
    error: action.payload
  }),
}, 
initialState, 
{ prefix },
);

export default auth;

// saga
const SIGNIN_SAGA = prefix + '/SIGNIN_SAGA';
export const signinSagaStart = (email, password) => ({
  type: SIGNIN_SAGA, 
  payload: { email, password },
});

export function* signinSaga(action) {
  try {
    // 호출 시작 => 로딩 시작
    // dispatch(signinStart())
    yield put(start())

    const { email, password } = action.payload;
    // const token = await AuthService.login(email, password);
    const token = yield call(AuthService.login, email, password) 
    // const token = response.data.token;
    // sleep
    // await sleep(1000);
    yield delay(2000);
    // 호출 완료 (정상)=> 로딩 끝
    localStorage.setItem('token', token); // side Effect 발생하는 아이
    // dispatch(signinSuccess(token));
    yield put(success(token));
    // 페이지를 이동한다.

    // history.push('/'); extraarguments에서 온 history
    // dispatch(push('/')) // push는 액션 생성 함수
    yield put(push('/'));
  } catch (error) {
    // dispatch(signinFail(error))
    // 호출 완료 (에러) => 로딩 끝
    console.log(error);
    yield put(fail(error));
  }
}
export function* authSaga() {
  yield takeEvery(SIGNIN_SAGA, signinSaga);
}

// export const getAuthSagaStart = () => ({type: BOOKS_SAGA});

// export function* booksSaga() {
//   yield takeEvery(BOOKS_SAGA, getBooksSaga);
// }