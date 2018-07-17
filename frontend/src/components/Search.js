import axios from 'axios';
import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import Header from './partial/Header.js';


class Search extends Component {

    constructor(props) {
        super(props);

        const qs = require('query-string');
        this.queryParams = qs.parse(window.location.search);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                </div>
            </div>
        );
    }
}

export default Search;
