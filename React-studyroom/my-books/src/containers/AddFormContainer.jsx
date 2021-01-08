import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AddForm from '../components/AddForm';
import { addBookSagaStart, getBooksSagaStart } from '../redux/modules/books';

const AddFormContainer = () => {
  const dispatch = useDispatch();
  const getBooks = useCallback(
    () => {
      dispatch(getBooksSagaStart());
    },
    [dispatch],
  );
  const addBook = useCallback(
    (book) => {
      dispatch(addBookSagaStart(book));
    },
    [dispatch],
  );
  return <AddForm addBook={addBook} getBooks={getBooks}/>;
};

export default AddFormContainer;