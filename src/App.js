import './App.css';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: 1
    }

    this.users = [
      { id: 1, name: 'Shachar' },
      { id: 2, name: 'Dor' },
      { id: 3, name: 'Michael' }
    ];
  }

  selectNewUser(newUser) {
    this.setState({ currentUser: newUser })
  }

  render() {
    return (
      <div className="App" >
        <h1>Breezometer excercise</h1>
        <h3>who are you?</h3>
        {this.users.map((user, i) => {
          return(<button key={i} onClick={() => this.selectNewUser(user.id)}>{user.name}</button>)
        })}
        <br></br>
        <Card user={this.state.currentUser}></Card>
      </div>
    );

  }
}

export default App;
