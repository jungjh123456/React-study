import logo from './logo.svg';
import './App.css';
import React from 'react';

const Person = React.memo(({name, age}) => { 
  return (
    <ul>
      {name} / {age}
    </ul>
  );
})
const App = () => {
  const [state, setState] = useState({
    text: "",
    persons: [
      { id: 1, name: "Mark", age: 37 },
      { id: 2, name: "Anna", age: 26 },
    ]
  });


  console.log("App render");
  const { text, persons } = state;

  const change = e => {
      setState({
      ...state,
      text: e.target.value
    });
  };

  const click = () => {
    console.log(this.state.text);
  };

  return (
    <div>
      <input type="text" value={text} onChange={change} />
      <button onClick={click}>click</button>
      <ul>
        {persons.map(p => (
          <Person {...p} key={p.id} />
        ))}
      </ul>
    </div>
  );

}
export default App;
