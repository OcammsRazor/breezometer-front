import React from 'react';
import Badge from '../badge/Badge';
import './Card.css';
import axios from 'axios';
import querystring from 'querystring'
import config from '../../configurations';
import {FaTrash} from 'react-icons/fa';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsList: [],
            favoriteLocations: [],
            currentUser: 1,
            qualityConditions: {}
        }

        this.headerConf = {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }

        this.users = [
            { id: 1, name: 'Shachar' },
            { id: 2, name: 'Dor' },
            { id: 3, name: 'Michael' }
        ];
    }

    componentDidMount() {
        fetch(config.server.url + '/locations/getLocationsList').then(response => response.json())
            .then(locations => {
                this.setState({ locationsList: locations });
                this.fetchFavoriteLocations(this.state.currentUser);
            })
    }

    selectNewUser(userId) {
        this.fetchFavoriteLocations(userId);
        this.setState({ currentUser: userId });
    }

    fetchFavoriteLocations(userId) {
        axios.post(config.server.url + '/users/getFavorites', querystring.stringify({ user_id: userId }), this.headerConf).then(response => {
            this.fetchQualityConditions(response.data)
            this.setState({ favoriteLocations: response.data })
        })
    }

    fetchQualityConditions(locationsList) {
        locationsList.map(location => {
            fetch(config.breezometerApi.url + 'lat=' + location.lat + '&lon=' + location.lon + '&key=' + config.breezometerApi.token).then(response => response.json())
                .then(locations => {
                    let obj = this.state.qualityConditions
                    obj[location.name] = locations.data.indexes.baqi.aqi
                    this.setState({ qualityConditions: obj })
                })
        })
    }

    shouldRenderLocation(location, i) {
        for (let i = 0; i < this.state.favoriteLocations.length; i++) {
            if (this.state.favoriteLocations[i].location_id === location.location_id) {
                return true;
            }
        }
        return false;
    }

    addToFavorite(location) {
        axios.post(config.server.url + '/users/addFavorite', querystring.stringify({ user_id: this.state.currentUser, location_id: location.location_id}), this.headerConf).then(response => {})
        let newFavoriteLocations = this.state.favoriteLocations
        newFavoriteLocations.push(location)
        this.fetchQualityConditions(newFavoriteLocations)
        this.setState({ favoriteLocations: newFavoriteLocations})
    }

    removeFromFavorites(locationToRemove) {
        axios.post(config.server.url + '/users/removeFavorite', querystring.stringify({ user_id: this.state.currentUser, location_id: locationToRemove.location_id}), this.headerConf).then(response => {})
        let newFavoriteLocations = this.state.favoriteLocations.filter(location => location != locationToRemove)
        this.fetchQualityConditions(newFavoriteLocations)
        this.setState({ favoriteLocations: newFavoriteLocations})
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
                            {this.state.favoriteLocations.map((location, i) => {
                                return (
                                    <div key={i} className='favorite-row'>
                                        <a className='dot'>•</a>
                                        <a className='location-name'>{location.name}</a>
                                        <a className='quality-conditions'>{this.state.qualityConditions[location.name]}/100</a>
                                        <button className='remove-btn' onClick={() => this.removeFromFavorites(location)}>
                                            <FaTrash/>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='bottom-locations'>
                        <div className='bottom-locations-row'>
                            {this.state.locationsList.map((location, i) => {
                                if (!this.shouldRenderLocation(location, i)) {
                                    return (
                                        <div key={i} onClick={() => this.addToFavorite(location)}>
                                            <Badge name={location.name}></Badge>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;