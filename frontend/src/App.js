import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import './components/css/App.css';

import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js';


/**
 * CSRF Prevention config
 */
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = token;
}

if (localStorage.getItem('authtoken') != null) {
    setAuthToken(localStorage.getItem('authtoken'));
}

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
