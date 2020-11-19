import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
 
export default function ProfileActions() {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to={routes.editProfile.path} className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
      <Link to={routes.addExperience.path} className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1"></i>
        Add Experience</Link>
      <Link to={routes.addEducation.path} className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1"></i>
        Add Education</Link>
    </div>
  )
}
