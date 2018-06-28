import axios from 'axios';
import React, { Component } from 'react';
import toastr from 'toastr';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';

import 'toastr/build/toastr.min.css';


class Login extends Component {
    constructor(props){
        super(props);

        if (isLoggedIn()) {
            this.props.history.push('/');
        }

        this.state = {
            inputUsername: '',
            inputPassword: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();

        var $this = this;

        axios.get('/api/users/login', {
            auth: {
                username: this.state.inputUsername,
                password: this.state.inputPassword,
            }
        }).then(function(response) {
            var token = response.data.token;

            if (response.status === 200) {
                userStore.dispatch({
                    type: 'USER_SET_INFO',
                    authToken: token,
                    name: response.data.name,
                    username: response.data.username,
                });

                toastr.info('Logged in !');
                $this.props.history.push('/');
            }

        }).catch(function (error) {
            if (typeof error.response.data.detail !== 'undefined') {
                toastr.info(error.response.data.detail);
            } else {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input type="text" className="form-control" id="inputUsername" placeholder="Enter username" value={this.state.inputUsername} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" value={this.state.inputPassword} onChange={this.handleInputChange} />
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
