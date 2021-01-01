export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const SHOW_DONE = "SHOW_DONE";
export const SHOW_ALL = "SHOW_ALL";

export const addTodo = (text) => (
   {type: ADD_TODO, text } // { type: ADD_TODO, text: text }
);

export const completeTodo = (index) => ({
  type: COMPLETE_TODO,
  index,
});

export const showDone = () => ({
  type: COMPLETE_TODO,
}); // 페이로드가 필요 없다.

export const showAll = () => ({
  type: SHOW_ALL
});
// 최초의 상태값
// ["text"]