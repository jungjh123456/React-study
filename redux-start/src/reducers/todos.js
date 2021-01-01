import { ADD_TODO, COMPLETE_TODO } from "../actions";

export default function todos(previousState, action) { 
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState];
    newTodos[action.index].done = true;
    return newTodos;
  } 


  return previousState;
}
