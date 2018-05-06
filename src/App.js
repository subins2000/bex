import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home.js';
import Login from './components/Login.js';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                </div>
            </Router>
        );
    }
}

export default App;
