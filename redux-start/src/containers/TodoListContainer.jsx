import TodoList from "../components/TodoList";
import { completeTodo } from '../actions';
import { useDispatch, useSelector } from "react-redux";

const TodoListContainer = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  function complete(index) {
    dispatch(completeTodo(index))
  }
  return <TodoList todos={todos} complete={complete} />
}
  
export default TodoListContainer;