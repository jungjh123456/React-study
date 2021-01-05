import BookService from "../../services/BookService";
import { sleep } from "../../utils";

// namespace
const namespace = 'fds17-my-books/books';

// action types
export const BOOK_SUCCESS = namespace + '/BOOK_SUCCESS';
export const BOOK_START = namespace + '/BOOK_START';
export const BOOK_FAIL = namespace + '/BOOK_FAIL';
export const BOOKS = namespace + '/BOOKS';
export const BOOKS_PENDING = namespace + '/BOOKS_PENDING';
export const BOOKS_FULFILLED = namespace + '/BOOKS_FULFILLED';
export const BOOKS_REJECTED = namespace + '/BOOKS_REJECTED';

// initial state
const initialState = {books: [], loading: false, error: null}; // 초기값 설정

// reducer
export default function books(state = initialState, action) {
  switch (action.type) {
    case BOOK_SUCCESS:
      return {books: action.books, loading: false, error: null};
      case BOOKS_FULFILLED:
        return {books: action.payload, loading: false, error: null};
    case BOOK_START:
      case BOOKS_PENDING:
        return { ...state, loading: true, error: null };
    case BOOK_FAIL:
      return { ...state, loading: false, error: action.error };
      case BOOKS_REJECTED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
  }
}

// action creators
const bookSuccess = (books) => ({
  type: BOOK_SUCCESS,
  books,
})


const bookStart = () => ({ // start할때는 없을 것이다.
  type: BOOK_START,
})


const bookFail = (error) => ({
  type: BOOK_FAIL,
  error,
})

// thunk
export const getBooksThunk = (token) => async (dispatch, getState) => {
  // dispatch를 할 수 있다.
  try {
    // 서버에 책 리스트 다오.
    // this.setState({loading: true});
    dispatch(bookStart()); // 로딩이 돌기 시작

    await sleep(2000);

    const books = await BookService.getBooks(token);
    dispatch(bookSuccess(books));

  }catch (error) {
    dispatch(bookFail(error));
  }
}


// promise
export const getBooksPromise = (token) => ({
  type: BOOKS,
  payload: BookService.getBooks(token),
})