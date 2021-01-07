import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AddFormContainer from "../containers/AddFormContainer";

const Add = () => {
  const token = useSelector(state => state.auth.token);

  if (token === null) {
    return <Redirect to="signin" /> 
  }

  return <AddFormContainer />
}

export default Add;