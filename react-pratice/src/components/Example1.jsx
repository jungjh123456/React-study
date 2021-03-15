import React from 'react';

const Example1 = React.memo(({state}) => {
  console.log(state.count)
  return (
    <div>
        {state.count}
    </div>
  );
}, (prev, next) => {
  console.log(prev, next);
  if (prev.state.count === next.state.count) {
    return true;
  } 
  return false;
});

export default Example1;