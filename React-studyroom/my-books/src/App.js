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
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import produce from 'immer';
import Add from "./pages/Add";
// 1. 히스토리를 생성
const history = createBrowserHistory();

// 2. 스토어를 생성
const store = create(history);



function App() {


  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);


  return (
   <ErrorBoundary FallbackComponent={Error}>
     {visible && (<Modal><div style={{
       width: '100vw',
       height: '100vh',
       background: 'rgba(0,0,0,0.5)',
     }}
     onClick={hide}
     >나는 모달이다.</div></Modal>)}
     <button onClick={show}>모달 오픈</button>
     <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/add" component={Add} />
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
