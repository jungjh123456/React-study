import './App.css';
import TodoListContainer from './containers/TodoListContainer';
import FormContainer from './containers/FormContainer';
import Example8 from './components/Example8';
import Example9 from './components/Example9';
import Counter from './components/Example1';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Counter />
				<TodoListContainer />
				<FormContainer />
				<Example8 />
				<Example9 />
			</header>
		</div>
	);
}

export default App;
