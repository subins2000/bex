import axios from 'axios';
import React, { Component } from 'react';
import toastr from 'toastr';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';


class Profile extends Component {
    constructor(props) {
        super(props);

        if (this.props.match.params.username) {
            this.username = this.props.match.params.username;
        } else if (isLoggedIn()) {
            this.username = userStore.getState()['username'];
        } else {
            this.props.history.push('/login');
        }

        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserInfo();
    }

    getUserInfo() {
        axios.post('/api/users/info', {
            username: this.username,
        }).then(function() {

        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                </div>
            </div>
        );
    }
}

export default Profile;
