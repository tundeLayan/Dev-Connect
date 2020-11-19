import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { ProfileActions } from './index';
import Experience from './Experience';
import Education from './Education';

function Dashboard() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {user} = useSelector(state => state.auth);
  const { profile, loading } = useSelector(state => state.profile);
  
  let dashBoardContent;

  // // Redirect to login page if user isn't authenticated
  // if(!auth.isAuthenticated){
  //   window.location.href = '/login';
  // }

  const onDeleteClick = () => {
    dispatch(deleteAccount()); 
  }
   
  if(profile === null || loading){
    dashBoardContent = <Spinner/>;
  }else{
    // check if logged in user has a profile data
    if(Object.keys(profile).length > 0){
      dashBoardContent = (
        <div>
          <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link></p>
          <ProfileActions />
          {Object.keys(profile.experience).length > 0 ? <Experience 
            experience={profile.experience}
          /> : <h2 className="my-3">No Experience yet</h2>}
          
          <Education  
            education={profile.education}
          />
          <div style={{ marginBottom: '60px' }} />
          <button onClick={onDeleteClick} className="btn btn-danger">Delete Profile</button>
        </div>
      )
    }else{
      // User is logged in but has no profile
      dashBoardContent = (
        <div>
          <p className="lead text-muted">Welcome { user.name }</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      )
    }
  }

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [])
  
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">
              Dashboard
            </h1>
            {dashBoardContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;