import React, { Component } from 'react';
import Header from './partial/Header.js';

class Register extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <p>
                        <h1>Register</h1>
                    </p>
                    <form>
                        <div className="form-group">
                            <label for="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label for="inputUsername">Username</label>
                            <input type="text" className="form-control" id="inputUsername" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label for="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" />
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
