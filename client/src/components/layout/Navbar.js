import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

function Navbar() {
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
            <a className="nav-link" href="profiles.html"> Developers
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={routes.register.path}>Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={routes.login.path}>Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </>
  )
}

export default Navbar;