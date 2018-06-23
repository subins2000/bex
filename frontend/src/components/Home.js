import React, { Component } from 'react';

import { isLoggedIn } from '../store.js';
import Header from './partial/Header.js';

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
                <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header">
                                BeX
                            </div>
                            <div className="card-body">
                                <form className="form-group row" id="bookSearchForm">
                                    <div className="col-10">
                                        <input type="text" className="form-control" id="bookQuery" name="bookQuery" placeholder="Search for books" />
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <p></p>
                        <div className="card">
                            <div className="card-header">
                                <span>My Books</span>&nbsp;
                                <a className="btn btn-primary btn-sm">
                                    <i className="material-icons">library_add</i>
                                </a>
                            </div>
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                    <div className="col-4">

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
