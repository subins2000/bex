import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import { isLoggedIn } from '../store.js';
import Header from './partial/Header.js';


class AddBook extends Component {
    constructor(props){
        super(props);

        console.log(isLoggedIn());

        if (!isLoggedIn()) {
            this.props.history.push('/login');
        }

        this.state = {
            inputTitle: '',
            inputAuthor: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();

        var $this = this;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container" id="content">
                    <h1>Add Book</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputName">Title</label>
                            <input type="text" className="form-control" id="inputTitle" placeholder="Title of the book" value={this.state.inputTitle} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAuthor">Author</label>
                            <input type="text" className="form-control" id="inputAuthor" placeholder="Name of author" value={this.state.inputAuthor} onChange={this.handleInputChange} />
                        </div>
                        <button className="btn btn-primary">Add Book</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddBook;
