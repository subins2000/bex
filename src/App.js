import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/partial/Header.js';
import Home from './components/Home.js';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Header/>
                    <div className="container">
                        <div className="intro row align-items-center">
                            <div className="col">
                                <center>
                                    <h1>BeX</h1>
                                    <p>Easily exchange books !</p>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
