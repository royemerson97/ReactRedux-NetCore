import React, { Component } from 'react';

class Post extends Component {
  render() {
  return (
    <div>
      <h5>{this.props.post.id.toString()}</h5>
      <h5>{this.props.post.title}</h5>
      <p>{this.props.post.message}</p>
    </div>
  );
 }
}
export default Post;