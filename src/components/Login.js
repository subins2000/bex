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
                        <div className="row">
                            <div className="col">
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="col">
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
