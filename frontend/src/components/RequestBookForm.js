import axios from 'axios';
import React, { Component } from 'react';


class RequestBookForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputMessage: 'Hey! I would love to have this book !',
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return (
            <form className="text-left">
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
