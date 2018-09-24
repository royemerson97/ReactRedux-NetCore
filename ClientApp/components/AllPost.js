import React, { Component } from 'react';
import Post from './Post'

import { connect } from 'react-redux';

class AllPost extends Component {
  render() {
      return (
          <div>
            {console.log(this.props)}
              <h1>All Posts</h1>
              {this.props.posts.map((post) => <Post key={post.id} post={post} />)}
              token : {this.props.token.token}
          </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer,
    token: state.tokenReducer
  }
}
export default connect(mapStateToProps)(AllPost);