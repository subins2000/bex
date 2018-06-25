import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import { isLoggedIn } from '../store.js';
import Header from './partial/Header.js';


class AddBook extends Component {
    constructor(props){
        super(props);

        if (!isLoggedIn()) {
            this.props.history.push('/login');
        }

        this.state = {
            inputTitle: '',
            inputAuthor: '',
            inputSemester: '0',
            inputBranch: '0',
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
            branchOptions.push(<option value={key}>{branches[key]}</option>);
        }

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
                        <div className="form-group row">
                            <div className="col">
                                <label htmlFor="inputSemester">Semester</label>
                                <select className="custom-select" id="inputSemester" value="{this.state.inputSemester}" onChange={this.handleInputChange}>
                                    <option value="0">Not Applicable</option>
                                    {[1,2,3,4,5,6,7,8].map((i) => <option value={i} key={i}>{i}</option>)}
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="inputBranch">Branch</label>
                                <select className="custom-select" id="inputBranch" value="{this.state.inputBranch}" onChange={this.handleInputChange}>
                                    <option value="0">Not Applicable</option>
                                    {branchOptions}
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-primary">Add Book</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddBook;
