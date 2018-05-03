import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './Header.js';
import './Home.js';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <p className="App-intro">
                    </p>
                </div>
            </Router>
        );
    }
}

export default App;
