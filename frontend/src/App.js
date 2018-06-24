import axios from 'axios';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './components/css/App.css';

import { userStore } from './store.js';
import AddBook from './components/AddBook.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js';


/**
 * CSRF Prevention config
 */
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

userStore.subscribe(function() {
    var state = userStore.getState();
    var token = state['authToken'];

    axios.defaults.headers.common['Authorization'] = token;

    if (state['authToken'] !== null) {
        localStorage.setItem('userState', JSON.stringify(state));
    }
});

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
