import axios from 'axios';
import React, { Component } from 'react';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';
import NotFound from './NotFound.js';


class Book extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNotFound: false,
        }

        if (this.props.match.params.slug) {
            this.username = this.props.match.params.username;
        } else {
            this.setState({
                isNotFound: true,
            });
        }
    }

    render() {
        return this.state.isNotFound ? <NotFound /> : (
            <div>
                <Header/>
                <div className="container" id="content">
                </div>
            </div>
        );
    }
}

export default Book;
