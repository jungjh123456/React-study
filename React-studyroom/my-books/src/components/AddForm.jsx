import React, { useState, useRef, useCallback, useEffect } from 'react';

const AddForm = ({ addBook, getBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const urlRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const changeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const changeAuthor = useCallback((e) => {
    setAuthor(e.target.value);
  }, []);

  const create = useCallback(() => {
    const url = urlRef.current.value;
    const message = messageRef.current.value;

    console.log(title, author, url, message);

    if (title === '' || author === '' || url === '' || message === '') {
      return;
    }

    // 비동기 로직
    addBook({ title, author, url, message });
  }, [title, author, addBook]);

  return (
    <div>
      <h1>Add Page</h1>
      <p>
        Title : <input type="text" value={title} onChange={changeTitle} />
      </p>
      <p>
        Author : <input type="text" value={author} onChange={changeAuthor} />
      </p>
      <p>
        Url : <input type="text" ref={urlRef} defaultValue="https://" />
      </p>
      <p>
        Message : <input type="text" ref={messageRef} />
      </p>
      <p>
        <button onClick={create}>생성</button>
      </p>
    </div>
  );
};

export default AddForm;