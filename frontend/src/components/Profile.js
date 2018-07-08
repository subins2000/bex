import axios from 'axios';
import React, { Component } from 'react';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';
import NotFound from './NotFound.js';


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

        this.state = {
            isNotFound: false,
            name: '',
        }

        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserInfo();
    }

    getUserInfo() {
        var $this = this;

        axios.post('/api/users/info', {
            username: this.username,
        }).then(function(r) {
            $this.setState({
                name: r.data.name
            });
        }).catch(function(e) {
            if (e.response.status === 404) {
                $this.setState({
                    isNotFound: true,
                });
            }
        });
    }

    render() {
        return this.state.isNotFound ? <NotFound /> : (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>{this.state.name}</h1>
                    <p class="text-muted">u/{this.username}</p>
                </div>
            </div>
        );
    }
}

export default Profile;
