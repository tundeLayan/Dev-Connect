import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../actions/authActions';

function Register(props) {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error)
  console.log(auth.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2
    };

    dispatch(registerUser(newUser, props.history));
  }

  return (
    <>
      <div className="register">
        {auth.user ? auth.user.name : 'null'}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames("form-control form-control-lg", {
                      'is-invalid' : errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={name} 
                    onChange={e => setName(e.target.value)}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
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
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
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
                <div className="form-group">
                  <input
                    type="password" 
                    className={classnames("form-control form-control-lg", {
                      'is-invalid' : errors.password2
                    })} 
                    placeholder="Confirm Password" 
                    name="password2" 
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                  />
                  {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ReactComponent.propTypes = {
//   // ...prop type definitions here
// }

export default withRouter(Register);