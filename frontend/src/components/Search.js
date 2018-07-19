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
            semester: this.queryParams['semester'],
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
                            <form className="form-group" ref={this.bookSearchForm} onSubmit={this.onBookSearchFormSubmit}>
                                <div className="row">
                                    <div className="col-10">
                                        <input type="text" className="form-control" id="bookQuery" name="bookQuery" placeholder="Search for books" value={this.state.bookQuery} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary icon">
                                            <i className="material-icons">search</i>
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </div><br/>
                                <div className="row">
                                    <div className="col-2">
                                        <select className="custom-select" id="semester" name="semester" value={this.state.semester} onChange={this.handleInputChange}>
                                            <option value="0">All Semesters</option>
                                            {[1,2,3,4,5,6,7,8].map((i) => <option value={i} key={i}>S{i}</option>)}
                                        </select>
                                    </div>
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
