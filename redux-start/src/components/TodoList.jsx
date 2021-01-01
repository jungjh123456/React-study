import React, { useContext, useEffect, useState } from 'react';
import { completeTodo } from '../actions';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState().todos); // todos와 filter를 둘다 가지고 있는 state다

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState().todos);
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