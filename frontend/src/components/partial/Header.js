import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import { isLoggedIn, userStore } from '../../store.js';


class Header extends Component {

    constructor(props){
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        userStore.dispatch({
            type: 'USER_LOG_OUT',
        });
    }

    userButtons() {
        var name = userStore.getState()['name'];

        return (
            <div className="dropdown">
                <a className="btn btn-primary">{name}</a>&nbsp;
                <Link className="btn btn-light" to="/" onClick={this.logOut}>Log Out</Link>
            </div>
        );
    }

    guestUserButtons() {
        return (
            <span>
                <Link className="btn btn-light" to="/login">Log In</Link>&nbsp;
                <Link className="btn btn-light" to="/register">Register</Link>
            </span>
        );
    }

    render() {
        var userControlButtons;

        if (isLoggedIn()) {
            userControlButtons = this.userButtons();
        } else {
            userControlButtons = this.guestUserButtons();
        }

        return (
            <nav className="navbar navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">BeX</Link>
                <form className="form-inline my-2 my-lg-0">
                    {userControlButtons}
                </form>
            </nav>
        );
    }
}

export default Header;
