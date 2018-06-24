import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import { isLoggedIn } from '../store.js';
import Header from './partial/Header.js';


class AddBook extends Component {
    render() {
        if (!isLoggedIn()) {
            this.props.history.push('/login');
        }

        return (
            <div>
                <Header/>
            </div>
        );
    }
}

export default AddBook;
