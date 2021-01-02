import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../actions";

function Form({add}) {
  const [count, setCount] = useState(0)
  const inputUseRef = useRef();
  const inputCreateRef = React.createRef();
  
  console.log(inputUseRef, inputCreateRef);
  return (
    <div>
      <input type="text" ref={inputUseRef}/>
      <input type="text" ref={inputCreateRef}/>
      <button onClick={click}>add</button>
      <p>count</p>
    </div>
  )
  function click() {
    // const todo = inputUseRef.current.value;
    // add(todo);
    // inputUseRef.current.value = "";
    setCount((count) => count + 1);
  }
}



export default Form;