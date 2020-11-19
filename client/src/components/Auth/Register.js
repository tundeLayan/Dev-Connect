import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

function Register(props) {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(auth.isAuthenticated){
      props.history.push('/dashboard');
    }
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
    console.log('Props History',props.history);
    dispatch(registerUser(newUser, props.history));
  }

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={handleSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address" 
                  name="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  error={errors.email}
                  info={"This site uses Gravatar so if you want a profile image, use a Gravatar email"}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password" 
                  name="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password" 
                  name="password2" 
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                  error={errors.password2}
                />
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