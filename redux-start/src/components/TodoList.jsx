import React from 'react';


export default function TodoList({todos, complete}) {
  
  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          complete(index);
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

