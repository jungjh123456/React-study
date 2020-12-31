import React, { useContext, useEffect, useState } from 'react';
import { completeTodo } from '../actions';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState());
    })
    return () => {
      unsubscribe();
    }
  }, [store]);

  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}