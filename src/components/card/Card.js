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
            favoriteLocations: [],
            currentUser: 1
        }


        this.users = [
            { id: 1, name: 'Shachar' },
            { id: 2, name: 'Dor' },
            { id: 3, name: 'Michael' }
        ];
    }

    componentWillMount() {
        fetch('http://localhost:3000/locations/getLocationsList').then(response => response.json())
            .then(locations => {
                this.setState({ locationsList: locations });
            })

        this.fetchFavoriteLocations(this.state.currentUser);
    }

    selectNewUser(userId) {
        this.fetchFavoriteLocations(userId);
        this.setState({currentUser: userId});
    }

    fetchFavoriteLocations(userId) {
        const headerConf = {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }

        axios.post('http://localhost:3000/users/getFavorites', querystring.stringify({ user_id: userId }), headerConf).then(response => {
            this.setState({ favoriteLocations: response.data });
        })
    }

    render() {
        return (
            <div>
                <div className="user-selection">
                    <h3>who are you?</h3>
                    {this.users.map((user, i) => {
                        return (<button key={i} onClick={() => this.selectNewUser(user.id)}>{user.name}</button>)
                    })}
                    <br></br>
                </div>
                <div className='card-wrapper'>
                    <div className='favorite-locations'>
                        <div className='favorite-section'>
                            {this.state.locationsList.map((location, i) => {
                                if (this.state.favoriteLocations.includes(location.location_id)) {
                                    return (
                                        <div className='favorite-row'>
                                            <a className='dot'>•</a>
                                            <a key={i} className='location-name'>{location.name}</a>
                                            <a className='quality-conditions'>43/100</a>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className='bottom-locations'>
                        <div className='bottom-locations-row'>
                            {this.state.locationsList.map((location, i) => (
                                <Badge key={i} name={location.name}></Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;