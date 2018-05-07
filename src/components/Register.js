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
                            <label for="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
