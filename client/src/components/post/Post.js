import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { getPost } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { routes } from '../../routes';

function Post(props) {
  const dispatch = useDispatch();
  const { post, loading } = useSelector(state => state.posts);
  let postContent;

  if(post === null || loading || Object.keys(post).length === 0){
    postContent = <Spinner />
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    )
  }

  useEffect(() => {
    dispatch(getPost(props.match.params.id))
  }, [])
  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={routes.feed.path} className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Post);
