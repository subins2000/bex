import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';

import Header from './partial/Header.js';

import 'toastr/build/toastr.min.css';


class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputEmail: '',
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
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" value={this.state.inputEmail} onChange={this.handleInputChange} />
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
