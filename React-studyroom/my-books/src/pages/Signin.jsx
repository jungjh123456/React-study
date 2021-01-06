import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SigninContainer from "../containers/SigninContainer";
// import Signin from "../components/Signin";


function SigninPage() {
  const token = useSelector((state) => state.auth.token);
  // auth
  if (token !== null) {
    return <Redirect to="/" />;
  }
   // return <Signin />
  return <SigninContainer />
}

export default SigninPage;