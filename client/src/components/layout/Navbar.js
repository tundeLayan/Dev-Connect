import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { routes } from '../../routes';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  const onLogoutClick = (e) => {
     e.preventDefault();
     dispatch(logoutUser());
     dispatch(clearCurrentProfile());
  }
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to={routes.feed.path}>Post Feed</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={routes.dashboard.path}>Dashboard</Link>
      </li>
      <li className="nav-item">
        {/* <Link className="nav-link" to={routes.register.path}>
          Logout
        </Link> */}
        <a 
          href="" 
          className="nav-link" 
          onClick={onLogoutClick}
        >
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px', narginRight: '5px' }}
            title="You must have your Gravatar connected to your email to display an image"
          />
          {' '}
          Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to={routes.register.path}>Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={routes.login.path}>Login</Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href={routes.landing.path}>DevConnector</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href={routes.profiles.path}> Developers
            </a>
          </li>
        </ul>
        {
          isAuthenticated ? authLinks : guestLinks 
        }
       
      </div>
    </div>
  </nav>
    </>
  )
}

export default Navbar;