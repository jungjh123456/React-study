import React, { useContext, useEffect, useState } from 'react';
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
  }, [store])
  return (
  <div>
      {todos.map(todo => <ul><li>{todo}</li></ul>)}
  </div>
  )
}