import { Redirect } from "react-router-dom";
import SigninContainer from "../containers/SigninContainer";
// import Signin from "../components/Signin";
import withToken from "../hocs/withToken";

function SigninPage({token}) {
  // auth
  if (token !== null) {
    return <Redirect to="/" />;
  }
   // return <Signin />
  return <SigninContainer />
}

export default withToken(SigninPage);