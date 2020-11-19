import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

export default function PostItem({ post, showActions }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const onDeleteClick = (id) => {
    dispatch(deletePost(id));
  }

  const onLikeClick = (id) => {
    dispatch(addLike(id));
  }

  const onUnlikeClick = (id) => {
    dispatch(removeLike(id));
  }

  const findUserLike = (likes) =>{
    if(likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    }else{
      return false;
    }
  }
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="#">
            <img className="rounded-circle d-none d-md-block" src={post.avatar}
              alt="" />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions ? (<span>
            <button onClick={() => onLikeClick(post._id)} type="button" className="btn btn-light mr-1">
            <i className={classnames("fas fa-thumbs-up", {"text-info" : findUserLike(post.likes)})}></i>
            <span className="badge badge-light">{post.likes.length}</span>
          </button>
          <button onClick={() => onUnlikeClick(post._id)} type="button" className="btn btn-light mr-1">
            <i className="text-secondary fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
            Comments
          </Link>

          {/* We want to show the delete button if it's the user logged in that created the post. */}
          {post.user === auth.user.id ? ( 
            <button 
              onClick={() => onDeleteClick(post._id)} 
              type="button" 
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button> ) : null}
            </span>): null}
          
        </div>
      </div>
    </div>
  )
}
PostItem.defaultProps = {
  showActions: true
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
}