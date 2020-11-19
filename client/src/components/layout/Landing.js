import React from 'react';
import { routes } from '../../routes';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function Landing() {
  const auth  = useSelector(state => state.auth);

  if(auth.isAuthenticated){
    window.location.href = '/dashboard';
  }
  
  return (
    <>
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector
                </h1>
                <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                <hr />
                <a href={routes.register.path} className="btn btn-lg btn-info mr-2">Sign Up</a>
                <a href={routes.login.path} className="btn btn-lg btn-light">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
