import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import { store } from './store';

import PrivateRoute from './components/common/PrivateRoute';

import { Navbar, Footer, Landing } from './components/layout';
import DashBoard from './components/Dashboard/Dashboard';
import { Login, Register } from './components/Auth';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/add-experience';
import AddEducation from './components/add-credentials/add-education';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';


import { routes } from './routes';

import './App.css';
import Posts from './components/posts/Posts';

// Check for token
if(localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode Token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current profile
    // Redirect to login
    window.location.href = '/login';
  }
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
            <Route exact path={routes.profiles.path} component={ Profiles } />
            <Route exact path={routes.profile.path} component={ Profile } />
            <Switch>
              <PrivateRoute 
                exact 
                path={routes.dashboard.path} 
                component={ DashBoard } 
              /> 
              <PrivateRoute
                exact
                path={routes.createProfile.path}
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path={routes.editProfile.path}
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path={routes.addExperience.path}
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path={routes.addEducation.path}
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path={routes.feed.path}
                component={Posts}
              />
              <PrivateRoute
                exact
                path={routes.post.path}
                component={Post}
              />
              
            </Switch>
            <Route exact path={routes.notFound.path} component={ NotFound } />

          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
