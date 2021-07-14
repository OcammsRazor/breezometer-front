import './App.css';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="App" >
        <h1>Breezometer excercise</h1>
        <Card></Card>
      </div>
    );

  }
}

export default App;
