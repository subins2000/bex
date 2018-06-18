import React, { Component } from 'react';

import Header from './partial/Header.js';
import {isLoggedIn} from '../App.js'

import './css/Home.css';


class Home extends Component {
    intro() {
        return (
            <div className="container" id="content">
                <div className="intro row align-items-center">
                    <div className="col">
                        <center>
                            <h1>BeX</h1>
                            <p>Easily exchange books !</p>
                        </center>
                    </div>
                </div>
            </div>
        );
    }

    dashboard() {
        return (
            <div className="container container-fluid" id="content">

            </div>
        );
    }

    render() {
        var content;

        if (isLoggedIn()) {
            content = this.dashboard();
        } else {
            content = this.intro();
        }

        return (
            <div>
                <Header/>
                {content}
            </div>
        );
    }
}

export default Home;
