import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Signin from '../components/Signin';
import { signinThunk } from '../redux/modules/auth';

const SigninContainer = () => {
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();
  const signin = useCallback((email, password) => {
    dispatch(signinThunk(email, password));
  }, [dispatch])
  return <Signin loading={loading} error={error} signin={signin}/>
}

export default SigninContainer;