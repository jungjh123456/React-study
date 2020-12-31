export const ADD_TODO = 'ADD_TODO';


export const addTodo = (text) => (
   {type: ADD_TODO, text } // { type: ADD_TODO, text: text }
  )

// 최초의 상태값
// ["text"]