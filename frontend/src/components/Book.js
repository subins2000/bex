import axios from 'axios';
import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';

import Header from './partial/Header.js';
import NotFound from './NotFound.js';
import RequestBookForm from './RequestBookForm.js';


class Book extends Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            branch: '',
            created_at: '',
            description: '',
            isNotFound: false,
            photo: '',
            semester: '',
            showRequestBookForm: false,
            title: '',
            user: '',
        }

        if (this.props.match.params.slug) {
            this.slug = this.props.match.params.slug;
        } else {
            this.setState({
                isNotFound: true,
            });
        }

        this.getBookInfo = this.getBookInfo.bind(this);
        this.onRequestBtnClick = this.onRequestBtnClick.bind(this);

        this.getBookInfo();
    }

    getBookInfo() {
        var $this = this;

        axios.get('/api/book/' + this.slug).then(function(r) {
            $this.setState({
                author: r.data.author,
                branch: r.data.branch,
                created_at: r.data.created_at,
                description: r.data.description,
                photo: r.data.photo,
                semester: r.data.semester,
                title: r.data.title,
                user: r.data.user,
            });
        }).catch(function(e) {
            if (e.response.status === 404) {
                $this.setState({
                    isNotFound: true,
                });
            }
        });
    }

    onRequestBtnClick() {
        this.setState({
            showRequestBookForm: true,
        });
    }

    render() {
        var added,
            authorSearchURI = '/search?authorQuery=' + this.state.author,
            bookViewURL = '/book/' + this.slug,
            branch = this.state.branch,
            branchSearchURI = '/search?branch=' + branch,
            photo,
            semester = this.state.semester,
            semesterSearchURI = '/search?semester=' + semester,
            userLink = '/u/' + this.state.user;

        if (this.state.photo) {
            photo = (
                <img src={this.state.photo} className="img-fluid" alt="" />
            );
        } else {
            photo = (
                <center>
                    <span className="alert alert-warning">No Photo Available</span>
                </center>
            );
        }

        if (!semester) {
            semester = 'Not applicable';
        }

        if (branch == '0') {
            branch = 'Not applicable';
        }

        if (this.state.created_at) {
            var d = new Date(this.state.created_at);
            added = d.toString();
        }

        return this.state.isNotFound ? <NotFound /> : (
            <div>
                <Header/>
                <div className="container" id="content">
                    <div className="card">
                        <div className="card-header">
                            <Link to={bookViewURL}>
                                <h1>{this.state.title}</h1>
                            </Link>
                        </div>
                        <div className="row card-body">
                            <div className="col-3">
                                {photo}
                            </div>
                            <div className="col-9">
                                <table className="table table-bordered table-hover">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Author</th>
                                            <td><Link to={authorSearchURI}>{this.state.author}</Link></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Semester</th>
                                            <td><Link to={semesterSearchURI}>{semester}</Link></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Branch</th>
                                            <td><Link to={branchSearchURI}>{branch}</Link></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Added on BeX</th>
                                            <td>{added} by&nbsp;
                                                <Link to={userLink} className="d-inline-block">
                                                    <i className="material-icons float-left">person</i>
                                                    <span>u/{this.state.user}</span>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" className="text-center">
                                                <button type="button" className="btn btn-primary" onClick={this.onRequestBtnClick}>
                                                    <i className="material-icons float-left">library_add</i>
                                                    &nbsp;
                                                    <span>Request This Book</span>
                                                </button>
                                                {this.state.showRequestBookForm ? <RequestBookForm slug={this.slug} /> : null}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="card">
                                    <div className="card-header">Description</div>
                                    <div className="card-body">
                                        {this.state.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Book;
