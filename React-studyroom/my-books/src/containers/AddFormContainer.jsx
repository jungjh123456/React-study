import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AddForm from '../components/AddForm';
import { addBookSagaStart } from '../redux/modules/books';

const AddFormContainer = () => {
  const dispatch = useDispatch();
  const addBook = useCallback(
    (book) => {
      dispatch(addBookSagaStart(book));
    },
    [dispatch],
  );
  return <AddForm addBook={addBook} />;
};

export default AddFormContainer;