import React, { Component } from 'react';
import PostForm from './Postform';
import AllPost from './AllPost'
import Auth from './Auth'
class Posts extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello React!</h1>
        <PostForm/>
        <AllPost/>
      </div>
    );
  }
}
export default Posts;