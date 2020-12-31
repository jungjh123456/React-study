import './App.css';
import { addTodo } from './actions';
import { useContext, useEffect, useState } from 'react';
import ReduxContext from './contexts/ReduxContext';
import TodoList from './components/TodoList';
import Form from './components/Form';


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
          <TodoList />
          <Form />
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
  
  
