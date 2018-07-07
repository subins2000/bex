import axios from 'axios';
import React, { Component } from 'react';
import toastr from 'toastr';

import { isLoggedIn } from '../store.js';
import Header from './partial/Header.js';


class Profile extends Component {
    constructor(props){
        super(props);
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

export default Profile;
