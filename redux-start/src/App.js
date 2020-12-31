import './App.css';
import { addTodo } from './actions';
import { useContext, useEffect, useState } from 'react';
import ReduxContext from './contexts/ReduxContext';


function App() {
  const store = useContext(ReduxContext);

  const [state, setState] = useState(store.getState());
    
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(store.getState());
      })
      return () => {
        unsubscribe();
      }
    },[store])

    return (
      <div className="App">
        <header className="App-header">
          {JSON.stringify(state)}
          <button onClick={click}>add</button>
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
  
  
