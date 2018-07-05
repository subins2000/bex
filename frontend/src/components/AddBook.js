import axios from 'axios';
import React, { Component } from 'react';
import toastr from 'toastr';

import { isLoggedIn } from '../store.js';
import Header from './partial/Header.js';


class AddBook extends Component {
    constructor(props){
        super(props);

        if (!isLoggedIn()) {
            this.props.history.push('/login');
        }

        this.initialState = {
            inputTitle: '',
            inputAuthor: '',
            inputSemester: '0',
            inputBranch: '0',
            inputDescription: '',
            inputPhotoLabel: 'Choose Photo',
        };
        this.state = this.initialState;

        this.inputPhoto = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();

        var $this = this;

        for (var key in this.state) {
            if (this.state[key] === '') {
                toastr.info('All fields should be filled');
                return;
            }
        }

        var data = new FormData();

        data.append('title', this.state.inputTitle);
        data.append('author', this.state.inputAuthor);
        data.append('semester', this.state.inputSemester);
        data.append('branch', this.state.inputBranch);
        data.append('description', this.state.inputDescription);

        if (this.inputPhoto.current.files.length === 1) {
            data.append('photo', this.inputPhoto.current.files[0]);
        }

        axios.post('/api/books/add', data).then(function(response) {

            if (response.status === 201) {
                toastr.info('Book added !');

                // Reset form
                $this.setState($this.initialState);
                $this.inputPhoto.current.value = '';
            }

        }).catch(function(error) {
            console.log(error);

            if (error.response.status === 401) {

            }
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
                                <select className="custom-select" id="inputSemester" value={this.state.inputSemester} onChange={this.handleInputChange}>
                                    <option value="0">Not Applicable</option>
                                    {[1,2,3,4,5,6,7,8].map((i) => <option value={i} key={i}>{i}</option>)}
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="inputBranch">Branch</label>
                                <select className="custom-select" id="inputBranch" value={this.state.inputBranch} onChange={this.handleInputChange}>
                                    <option value="0">Not Applicable</option>
                                    {branchOptions}
                                </select>
                            </div>
                            <div className="col">
                                <label>Photo</label>
                                <div className="custom-file">
                                    <input type="file" accept="image/*" className="custom-file-input" id="inputPhoto" ref={this.inputPhoto} onChange={(e)=> {
                                            this.setState({
                                                inputPhotoLabel: e.target.files[0].name,
                                            });
                                        }} />
                                    <label className="custom-file-label" htmlFor="inputPhoto">{this.state.inputPhotoLabel}</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDescription">Description</label>
                            <textarea type="text" className="form-control" id="inputDescription" placeholder="Description of the book. Year of publication, what it is about, condition of the book etc." value={this.state.inputDescription} onChange={this.handleInputChange} />
                        </div>
                        <button className="btn btn-primary">Add Book</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddBook;
