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

        this.state = {
            bookQuery: this.queryParams['bookQuery'],
        };

        this.bookSearchForm = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onBookSearchFormSubmit = this.onBookSearchFormSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    onBookSearchFormSubmit(e) {
        e.preventDefault();

        var queryString = new URLSearchParams(new FormData(this.bookSearchForm['current'])).toString();

        this.props.history.push('/search?' + queryString);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <div className="card">
                        <div className="card-header">
                            Search
                        </div>
                        <div className="card-body">
                            <form className="form-group row" ref={this.bookSearchForm} onSubmit={this.onBookSearchFormSubmit}>
                                <div className="col-10">
                                    <input type="text" className="form-control" id="bookQuery" name="bookQuery" placeholder="Search for books" value={this.state.bookQuery} onChange={this.handleInputChange} />
                                </div>
                                <div className="col-2">
                                    <button type="submit" className="btn btn-primary icon">
                                        <i className="material-icons">search</i>
                                        <span>Search</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
