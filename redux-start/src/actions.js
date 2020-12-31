export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const addTodo = (text) => (
   {type: ADD_TODO, text } // { type: ADD_TODO, text: text }
);

export const completeTodo = (index) => ({
  type: COMPLETE_TODO,
  index,
});

// 최초의 상태값
// ["text"]