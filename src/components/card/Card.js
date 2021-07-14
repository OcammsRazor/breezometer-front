import React from 'react';
import Badge from '../badge/Badge'
import './Card.css'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsList: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:3000/locations/getLocationsList').then(response => response.json())
        .then(locations => {
            this.setState({locationsList: locations})
        })
    }

    render() {
        return (
            <div className='card-wrapper'>
                {this.state.locationsList.map(location => (
                    <Badge name={location.name}></Badge>
                ))}
            </div>
        );
    }
}

export default Card;