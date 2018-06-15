import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom'
import Header from './partial/Header.js';


class NotFound extends Component {
    componentDidMount(){
        document.title = '404 Not Found'
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <div className="row align-items-center">
                        <div className="col">
                            <center>
                                <h1>404</h1>
                                <p>This page doesn't exist.</p>
                                <p>
                                    <Link className="btn btn-warning" to="/">Home</Link>
                                </p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
