import React, { Component } from 'react';
import Header from './partial/Header.js';

import './css/Home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <div className="intro row align-items-center">
                        <div className="col">
                            <center>
                                <h1>404</h1>
                                <p>This page doesn't exist.</p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
