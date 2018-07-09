import axios from 'axios';
import React, { Component } from 'react';

import { isLoggedIn, userStore } from '../store.js';
import Header from './partial/Header.js';
import NotFound from './NotFound.js';


class Profile extends Component {

    constructor(props) {
        super(props);

        if (this.props.match.params.username) {
            this.username = this.props.match.params.username;
        } else if (isLoggedIn()) {
            this.username = userStore.getState()['username'];
        } else {
            this.props.history.push('/login');
        }

        this.state = {
            bookList: [],
            isNotFound: false,
            name: '',
        }

        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserInfo();
    }

    getUserInfo() {
        var $this = this;

        axios.post('/api/users/info', {
            username: this.username,
        }).then(function(r) {
            var books = r.data.books,
                bookList = [];

            for (var i = 0;i < books.length;i++) {
                bookList.push(
                    <div className="card">
                        <img className="card-img-top" src={books[i].photo} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{books[i].title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{books[i].author}</h6>
                        </div>
                    </div>
                );
            }

            $this.setState({
                bookList: bookList,
                name: r.data.name,
            });
        }).catch(function(e) {
            if (e.response.status === 404) {
                $this.setState({
                    isNotFound: true,
                });
            }
        });
    }

    render() {
        return this.state.isNotFound ? <NotFound /> : (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>{this.state.name}</h1>
                    <p class="text-muted">u/{this.username}</p>
                </div>
            </div>
        );
    }
}

export default Profile;
