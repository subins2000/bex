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
            branch: '',
            results: [],
            semester: this.queryParams['semester'],
        };

        this.bookSearchForm = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onBookSearchFormSubmit = this.onBookSearchFormSubmit.bind(this);
        this.search = this.search.bind(this);

        this.search();
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    onBookSearchFormSubmit(e) {
        e.preventDefault();

        var queryString = new URLSearchParams(new FormData(this.bookSearchForm['current'])).toString();

        this.props.history.push('/search?' + queryString);

        this.search();
    }

    search() {
        var $this = this;

        axios.get('/api/books/search', {
            params: {
                bookQuery: this.state.bookQuery,
                branch: this.state.branch,
            }
        }).then(function(response) {
            var books = response.data,
                bookList = [],
                url = '';

            for (var i = 0;i < books.length;i++) {
                url = '/book/' + books[i].slug;
                bookList.push(
                    <div className="card" key={i}>
                        <img className="card-img-top" src={books[i].photo} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={url}>{books[i].title}</Link>
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">{books[i].author}</h6>
                        </div>
                    </div>
                );
            }

            $this.setState({
                results: bookList,
            })
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        var branches = {
            'civil': 'Civil Engineering',
            'cse': 'Computer Science Engineering',
            'ec': 'Electronics & Communication Engineering',
            'eee': 'Electrical & Electronics Engineering',
            'mech': 'Mechanical Engineering',
            'pe': 'Production Engineering'
        };
        var branchOptions = [];

        for (var key in branches) {
            branchOptions.push(<option value={key} key={key}>{branches[key]}</option>);
        }

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
                                    <div className="col-6">
                                        <select className="custom-select" id="semester" name="semester" value={this.state.semester} onChange={this.handleInputChange}>
                                            <option>Choose Semester :</option>
                                            <option value="0">All Semesters</option>
                                            {[1,2,3,4,5,6,7,8].map((i) => <option value={i} key={i}>S{i}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <select className="custom-select" id="inputBranch" value={this.state.inputBranch} onChange={this.handleInputChange}>
                                            <option>Choose Branch :</option>
                                            <option value="0">All Branches</option>
                                            {branchOptions}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className="card">
                        <div className="card-header">
                            <span>{this.state.results.length} results</span>
                        </div>
                        <div className="card-body">
                            <div className={this.state.results.length > 0 ? 'd-none' : ''}>
                                <p>No results found</p>
                            </div>
                            <div className="card-columns">
                                {this.state.results}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
