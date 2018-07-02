import axios from 'axios';
import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';

import './css/Home.css';


class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            bookList: [],
        };

        this.updateUserBooks();
    }

    updateUserBooks() {
        if (!isLoggedIn())
            return;

        axios.get('/api/books/list').then(function(response) {
            if (response.status === 200) {
                userStore.dispatch({
                    type: 'USER_SET_BOOKS',
                    books: response.data,
                });
            }
        });
    }

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
        var $this = this;
        userStore.subscribe(function() {
            var books = userStore.getState()['books'],
                bookList = [],
                title = '';

            for (var i = 0;i < books.length;i++) {
                title = books[i].title;
                bookList.push(
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">{title}</p>
                        </div>
                    </div>
                );
            }

            $this.setState({
                bookList: bookList
            });
        });

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
                                        <button type="submit" className="btn btn-primary icon">
                                            <i className="material-icons">search</i>
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <p></p>
                        <div className="card">
                            <div className="card-header">
                                <span>My Books</span>&nbsp;
                                <Link to="/addbook" className="btn btn-primary btn-sm icon">
                                    <i className="material-icons">library_add</i>
                                    <span>Add Book</span>
                                </Link>
                            </div>
                            <div className="card-body">
                                <div class="card-columns">
                                {this.state.bookList}
                                </div>
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
