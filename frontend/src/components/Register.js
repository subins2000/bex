import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';

import Header from './partial/Header.js';

import 'toastr/build/toastr.min.css';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputEmail: '',
            inputUsername: '',
            inputPassword: '',
            inputName: '',
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

        axios.post('/api/users/register', {
            email: this.state.inputEmail,
            username: this.state.inputUsername,
            password: this.state.inputPassword,
            name: this.state.inputName,
        }).then(function(response) {

            if (response.status === 201) {
                toastr.info('Account Created!');
                $this.props.history.push('/login');
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>Register</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" value={this.state.inputEmail} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input type="text" className="form-control" id="inputUsername" placeholder="Enter username" value={this.state.inputUsername} onChange={this.handleInputChange} />
                            <blockquote className="blockquote">
                                u/{this.state.inputUsername}
                            </blockquote>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" value={this.state.inputPassword} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" id="inputName" placeholder="Enter name" value={this.state.inputName} onChange={this.handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
