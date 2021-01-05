import { Redirect } from "react-router-dom";
import withToken from "../hocs/withToken";
import BookListContainer from '../containers/BookListContainer';

function Home({token}) {
  if (token === null) {
    return <Redirect to="/signin" />
  }
  return (<BookListContainer token={token}/>)
}

export default withToken(Home);