import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

function Posts() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.posts);
  let postContent;

  if(posts === null || loading) {
    postContent = <Spinner />
  } else{
    postContent = <PostFeed posts={posts} />;
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [])

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Posts;