import TodoList from "../components/TodoList";
import { completeTodo } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

const TodoListContainer = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const complete = useCallback((index) => {
    dispatch(completeTodo(index))
  }, [dispatch])
  
  return <TodoList todos={todos} complete={complete} />
}
  
export default TodoListContainer;