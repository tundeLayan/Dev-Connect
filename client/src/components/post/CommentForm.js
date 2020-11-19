import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextAreaFieldGroup } from '../common';
import { addComment } from '../../actions/postActions';

function CommentForm({ postId }) {
  const dispatch = useDispatch();

  const stateError = useSelector(state => state.error);
  const { user } = useSelector(state => state.auth);

  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(()=> {
    if(stateError){
      setErrors(stateError)
    }
  }, [stateError])

  const onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
    }
    dispatch(addComment(postId, newComment));
    setText("");
  }
  return (
    <div className="post-form mb-3">
    <div className="card card-info">
      <div className="card-header bg-info text-white">Make a comment...</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <TextAreaFieldGroup
              placeholder="Reply to post"
              name="text"
              value={text}
              onChange={(e)=> setText(e.target.value)}
              error={errors.text}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CommentForm;
