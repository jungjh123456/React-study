import { connect } from "react-redux";
import { addTodo } from "../actions";
import Form from "../components/Form";

// Container
const FormContainer = connect(null, (dispatch) => {
  return {
    add: (todo) => {
      dispatch(addTodo(todo));
    }
  }; // props가 리턴된다.
})(Form);

export default FormContainer;