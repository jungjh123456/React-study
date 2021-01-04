import { Redirect } from "react-router-dom";
import withToken from "../hocs/withToken";
import BookList from "../components/BookList";
function Home({token}) {
  if (token === null) {
    return <Redirect to="/signin" />
  }
  return (<BookList token={token}/>)
}

export default withToken(Home);