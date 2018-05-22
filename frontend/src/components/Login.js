import React, { Component } from 'react';
import Header from './partial/Header.js';

class Login extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <p>
                        <h1>Login</h1>
                    </p>
                    <form>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <button class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;