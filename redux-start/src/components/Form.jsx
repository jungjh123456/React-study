import React, { useContext, useRef } from 'react';
import { addTodo } from "../actions";
import ReduxContext from '../contexts/ReduxContext';

export default function Form() {
  const store = useContext(ReduxContext);

  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    const todo = inputRef.current.value;
    addTodo(todo);
    store.dispatch(addTodo(todo))
    inputRef.current.value = "";
  }
}