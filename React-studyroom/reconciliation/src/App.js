import logo from './logo.svg';
import './App.css';
import React from 'react';

class Foo extends React.Component {
  state = {};

  componentDidMount() {
    console.log("Foo componentDidMount", this.props.children);
  }

  componentWillUnmount() {
    console.log("Foo componentWillUnmount");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Foo getDerivedStateFromProps", nextProps, prevState);
    return {};
  }

  render() {
    console.log("Foo render", this.props.children);
    return <p>{this.props.children}</p>;
  }
}

class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 3000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return (
        <ul>
          <Foo key="2">second</Foo>
          <Foo key="3">third</Foo>
        </ul>
      );
    }
    return (
      <ul>
        <Foo key="1">first</Foo>
        <Foo key="2">second</Foo>
        <Foo key="3">third</Foo>
      </ul>
    );
  }
}
export default App;
