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

        this.state = {};

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
                        <button className="btn btn-primary">Add Book</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddBook;
