import axios from 'axios';
import React, { Component } from 'react';

import Header from './partial/Header.js';
import NotFound from './NotFound.js';


class Book extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNotFound: false,
        }

        if (this.props.match.params.slug) {
            this.slug = this.props.match.params.slug;
        } else {
            this.setState({
                isNotFound: true,
            });
        }

        this.getBookInfo = this.getBookInfo.bind(this);
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
        var added,
            branch = this.state.branch,
            photo,
            semester = this.state.semester;

        if (this.state.photo) {
            photo = (
                <img src={this.state.photo} className="img-fluid" alt="" />
            );
        }

        if (!semester) {
            semester = 'Not applicable';
        }

        if (!branch) {
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
                    <h1>{this.state.title}</h1>
                    <div className="row card-body">
                        <div className="col-3">
                            {photo}
                        </div>
                        <div className="col-9">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <th scope="row">Author</th>
                                        <td>{this.state.author}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Semester</th>
                                        <td><span className="alert alert-info">{semester}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Branch</th>
                                        <td><span className="alert alert-info">{branch}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Added on BeX</th>
                                        <td><span className="alert alert-info">{added}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="card">
                                <div class="card-header">Description</div>
                                <div className="card-body">
                                    {this.state.description}
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
