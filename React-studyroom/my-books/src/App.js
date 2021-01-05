import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import Error from './pages/Error';
import Signin from './pages/Signin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';

//redux

import store from "./redux/create";

function App() {
  return (
   <ErrorBoundary FallbackComponent={Error}>
     <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin}/>
          <Route path="/" exact component={Home}/>
          <Route component={NotFound}/>
        </Switch>
     </BrowserRouter>
     </Provider>
   </ErrorBoundary>
  );
}

export default App;
