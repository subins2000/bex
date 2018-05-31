import React, { Component } from 'react';
import Header from './partial/Header.js';

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
                            <input type="email" className="form-control" placeholder="Enter email" value={this.state.inputEmail} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.inputPassword} onChange={this.handleInputChange} />
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
