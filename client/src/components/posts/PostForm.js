import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextAreaFieldGroup } from '../common';
import { addPost } from '../../actions/postActions';

function PostForm() {
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

    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar
    }

    dispatch(addPost(newPost));
    setText("");
  }
  return (
    <div className="post-form mb-3">
    <div className="card card-info">
      <div className="card-header bg-info text-white">Say Something...</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <TextAreaFieldGroup
              placeholder="Create a post"
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

export default PostForm;
