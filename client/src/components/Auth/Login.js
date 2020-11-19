import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

function Login(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // This will check the store and find every error avalible,
  // the error gotten would be dispatched from every action's
  // catch
  const error = useSelector(state => state.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(auth.isAuthenticated){
      props.history.push('/dashboard');
    }
    setErrors(error)
  }, [error, auth])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    dispatch(loginUser(newUser));
  }

  return (
    <div>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={handleSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address" 
                  name="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password" 
                  name="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login);