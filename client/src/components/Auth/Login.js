import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

function Login(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
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
            <div className="form-group">
              <input 
                type="email" 
                className={classnames("form-control form-control-lg", {
                  'is-invalid' : errors.email
                })} 
                placeholder="Email Address" 
                name="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </div>
            <div className="form-group">
              <input 
                type="password" 
                className={classnames("form-control form-control-lg", {
                  'is-invalid' : errors.password
                })} 
                placeholder="Password" 
                name="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
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