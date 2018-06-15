import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom'


class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">BeX</Link>
                <form className="form-inline my-2 my-lg-0">
                    <Link className="btn btn-light" to="/login">Login</Link>&nbsp;
                    <Link className="btn btn-light" to="/register">Register</Link>
                </form>
            </nav>
        );
    }
}

export default Header;
