import React, { Component } from 'react';
import Header from './partial/Header.js';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: ''
        };

        this.updateUsername = this.updateUsername.bind(this);
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

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
                            <input type="text" className="form-control" id="inputUsername" placeholder="Enter username" onKeyUp={this.updateUsername} />
                            <blockquote className="blockquote">
                                u/{this.state.username}
                            </blockquote>
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
