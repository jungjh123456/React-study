import React, { useReducer } from "react";

const reducer = (previousState, action) => {
  if (action.type === "PLUS") {
    return {
      count: previousState.count + 1,
    };
  }
  return previousState;
}

const Example8 = () => {
  const [state, dispatch] = useReducer(reducer, {count: 0});

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={click}>Click me</button>
    </div>
  );
  function click() {
    dispatch({ type: "PLUS" });
  }
}

export default Example8;