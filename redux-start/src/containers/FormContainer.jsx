// import { connect } from "react-redux";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions";
import Form from "../components/Form";

// Container
// const FormContainer = connect(null, (dispatch) => ({
//     add: (todo) => {
//       dispatch(addTodo(todo));
//   }, // props가 리턴된다.
// }))(Form);

const FormContainer = () => {
  const dispatch = useDispatch();
  // function add(todo) {
  //   dispatch(addTodo(todo))
  // }
  const add = useCallback((todo) => {
    dispatch(addTodo(todo))
  },[dispatch]);
  return <Form add={add} />
}

export default FormContainer;