import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import Error from './pages/Error';
import Signin from './pages/Signin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
   <ErrorBoundary FallbackComponent={Error}>
     <BrowserRouter>
      <Switch>
        <Route path="/signin" component={Signin}/>
        <Route path="/" exact component={Home}/>
        <Route component={NotFound}/>
      </Switch>
     </BrowserRouter>
   </ErrorBoundary>
  );
}

export default App;
