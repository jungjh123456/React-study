import { Redirect } from "react-router-dom";
import Signin from "../components/Signin";
import withToken from "../hocs/withToken";
function SigninPage(props) {
  // auth
  console.log(props);
  const {token} = props;
  if (token !== null) {
    return <Redirect to="/" />;
  }
  return <Signin />
}

export default withToken(SigninPage);