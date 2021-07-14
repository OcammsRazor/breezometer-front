import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }

export default Card;