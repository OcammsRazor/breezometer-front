import React from 'react';
import './Badge.css';

class Badge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="badge-wrapper">
                <a className="badge-plus-sign">+</a>
                <a className="badge-text">{this.props.name}</a>
            </div>
        );
    }
}

export default Badge;