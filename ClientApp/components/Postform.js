import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';

class PostForm extends Component {
    state = {
        getTitle : '',
        getMessage: ''
    }

    handleTitleChange = (e) =>{
        this.setState({getTitle : e.target.value})
    }

    handleMessageChange = (e) =>{
        this.setState({getMessage : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.state.getTitle;
        const message = this.state.getMessage;
        const data = {
            id: new Date(),
            title,
            message
        }
        this.props.dispatch({
            type: 'ADD_POST',
            data
        });
        this.props.dispatch({
            type: 'SET_TOKEN',
            payload: message
        })
        this.setState({getTitle : '', getMessage : ''})
    }
    render() {
        return (
            <div>
                <h1>Create Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <input required type="text" onChange={this.handleTitleChange}
                        placeholder="Enter Post Title" />
                    <br /><br />
                    <textarea required rows="5" onChange={this.handleMessageChange} cols="28"
                        placeholder="Enter Post" />
                    <br /><br />
                    <button>Post</button>
                </form>
            </div>
        );
    }
}
export default connect()(PostForm); 