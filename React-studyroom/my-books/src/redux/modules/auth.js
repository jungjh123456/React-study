import axios from "axios";
import { sleep } from "../../utils";


// namespace
const namespace = 'fds17-my-books/auth';

// action types
const START = namespace + '/START';
const SUCCESS = namespace + '/SUCCESS';
const FAIL = namespace + '/FAIL';


// initial state
const initialState = { token: null, loading: false, error: null }; // 초기값 설정

// reducer
export default function auth(state = initialState, action) {
  switch (action.type) {
    case START:
      return {token: null, loading: true, error: null}
    case SUCCESS:
      return {token: action.token, loading: false, error: null}
    case FAIL:
      return {token: null, loading: false, error: action.error}
    default:
        return state;
  }
}

// action creators
export const signinStart = () => ({
  type: START
});

export const signinSuccess = (token) => ({
  type: SUCCESS,
  token
})

export const signinFail = (error) => ({
  type: FAIL,
  error
})
// thunk
export const signinThunk = (email, password) => async (dispatch, getState) => {
  try {
    // 호출 시작 => 로딩 시작
    dispatch(signinStart())
    const response = await axios.post('https://api.marktube.tv/v1/me', {
      email,
      password,
    });
    // sleep
    await sleep(1000);
    // 호출 완료 (정상)=> 로딩 끝
    const token = response.data.token;
    
    localStorage.setItem('token', token);
    dispatch(signinSuccess(token));
    // 페이지를 이동한다.
    // this.props.history.push('/');
  } catch (error) {
    this.setState({ loading: false })
    // 호출 완료 (에러) => 로딩 끝
    console.log(error);
  }
}
