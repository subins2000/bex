import React, { Component } from 'react';

import Header from './partial/Header.js';
import {isLoggedIn} from '../App.js';

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
            <div className="container" id="content">
                <div class="row">
                    <div class="col-8">
                        <div class="card">
                            <div class="card-header">
                                <span>My Books</span>&nbsp;
                                <a class="btn btn-primary btn-sm">
                                    <i class="material-icons">library_add</i>
                                </a>
                            </div>
                            <div class="card-body">

                            </div>
                        </div>
                    </div>
                    <div class="col-4">

                    </div>
                </div>
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
