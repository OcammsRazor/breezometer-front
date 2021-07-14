import React from 'react';
import Badge from '../badge/Badge';
import './Card.css';
import axios from 'axios';
import querystring from 'querystring'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsList: [],
            favoriteLocations: []
        }
    }

    componentWillMount() {
        const headerConf = {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }

        fetch('http://localhost:3000/locations/getLocationsList').then(response => response.json())
            .then(locations => {
                this.setState({ locationsList: locations });
            })

        axios.post('http://localhost:3000/users/getFavorites', querystring.stringify({ user_id: this.props.user }), headerConf).then(response => {
            this.setState({ favoriteLocations: response.data });
        })
    }

    render() {
        return (
            <div className='card-wrapper'>
                <div className='favorite-locations'>
                    {this.state.locationsList.map((location, i) => {
                        if (this.state.favoriteLocations.includes(location.id)) {
                            return (
                                <Badge key={i} name={location.name}></Badge>
                            )
                        }
                    })}
                </div>
                <div className='bottom-locations'>
                    {this.state.locationsList.map((location, i) => (
                        <Badge key={i} name={location.name}></Badge>
                    ))}
                </div>
            </div>
        );
    }
}

export default Card;