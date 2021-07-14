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
                {this.props.name}
            </div>
        );
    }
}

export default Badge;