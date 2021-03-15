import React, { useEffect, useState } from 'react';

const Example3 = ({state, setState}) => {
  const [a, setA] = useState(null);

  useEffect(() => {
    setA(state.count)
  },[])
  console.log(a)
  const clicked = () => {
    setA(a+1);
    // setState({count: state.count++})
  }
  return (
    <div>
      {a}
      <button onClick={clicked}>hello</button>
    </div>
  );
};

export default Example3;