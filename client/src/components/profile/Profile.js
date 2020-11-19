import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

function Profile(props) {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);

  useEffect(() => {
    if(props.match.params.handle){
      dispatch(getProfileByHandle(props.match.params.handle));
    }
  }, [])
  let profileContent;

  useEffect(() => {
    console.log('Props History', props.history)
    if(profile === null && loading){
      props.history.push('/not-found')
    }
  }, [profile])

  if(profile === null || loading){
    profileContent = <Spinner />
  }else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6"></div>
        </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
      </div>
    )
  }
  return (
    <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
  )
}

export default withRouter(Profile);