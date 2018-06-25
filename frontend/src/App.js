import axios from 'axios';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import { isLoggedIn, userStore } from './store.js';
import AddBook from './components/AddBook.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import NotFound from './components/NotFound.js';
import Register from './components/Register.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import './components/css/App.css';


/**
 * CSRF Prevention config
 */
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

userStore.subscribe(function() {
    var state = userStore.getState();
    var token = state['authToken'];

    axios.defaults.headers.common['Authorization'] = 'Token ' + token;

    if (state['authToken'] !== null) {
        localStorage.setItem('userState', JSON.stringify(state));
    }
});

if (isLoggedIn()) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + userStore.getState()['authToken'];

    axios.get('/api/users/authcheck').catch(function(error) {
        if (error.response.status === 401) {
            userStore.dispatch({
                type: 'USER_LOG_OUT',
            });
            window.location.reload();
        }
    });
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
                        <Route exact path="/addbook" component={AddBook} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
