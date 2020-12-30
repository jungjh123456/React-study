export const ADD_TODO = 'ADD_TODO';


export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}

// 최초의 상태값
// ["text"]