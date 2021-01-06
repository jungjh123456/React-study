import { ErrorBoundary } from "react-error-boundary";
import { Switch, Route, Router } from "react-router-dom";

// Pages
import Error from './pages/Error';
import Signin from './pages/Signin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';

//redux

import create from "./redux/create";
import { createBrowserHistory } from "history"; // 이 history는 react-router-dom을 설치하면 자동으로 생긴다.
import { ConnectedRouter } from "connected-react-router";
// 1. 히스토리를 생성
const history = createBrowserHistory();

// 2. 스토어를 생성
const store = create(history);

function App() {
  return (
   <ErrorBoundary FallbackComponent={Error}>
     <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/signin" component={Signin}/>
          <Route path="/" exact component={Home}/>
          <Route component={NotFound}/>
        </Switch>
     </ConnectedRouter>
     </Provider>
   </ErrorBoundary>
  );
}

export default App;
