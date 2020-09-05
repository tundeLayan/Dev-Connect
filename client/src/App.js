import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import { Provider } from 'react-redux';
import { store } from './store';

import { Navbar, Footer, Landing } from './components/layout';
import { Login, Register } from './components/Auth';

import { routes } from './routes';

import './App.css';

// Check for token
if(localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode Token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path={routes.landing.path} component={ Landing } />
          <div className="container">
            <Route exact path={routes.register.path} component={ Register } />
            <Route exact path={routes.login.path} component={ Login } />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
