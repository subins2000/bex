import axios from 'axios';
import React, { Component } from 'react';


class RequestBookForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputMessage: 'Hey! I would love to have this book !',
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.props.slug);
        axios.post('/api/book/' + this.props.slug + '/chat', {
            msg: this.state.inputMessage,
        });
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return (
            <form className="text-left" onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="inputMessage">Message</label>
                    <textarea type="text" className="form-control" id="inputMessage" value={this.state.inputMessage} onChange={this.handleInputChange} />
                </div>
                <div className="form-grpup">
                    <button className="btn btn-primary">Send</button>
                </div>
            </form>
        )
    }
}

export default RequestBookForm;
