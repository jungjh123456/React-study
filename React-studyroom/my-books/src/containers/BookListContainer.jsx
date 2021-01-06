
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookList from "../components/BookList";
import { getBooksSagaStart } from "../redux/modules/books";


export default function BookListContainer() {
  // redux 와의 연결고리
  const books = useSelector((state) => state.books.books); // useSelector를 가지고 가져올 수 있다.
  const loading = useSelector((state) => state.books.loading); 
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  const getBooks = useCallback(async () => {
    dispatch(getBooksSagaStart());
  }, [dispatch])

  
  return <BookList 
            books={books} 
            loading={loading} 
            error={error} 
            getBooks={getBooks}
          />
}