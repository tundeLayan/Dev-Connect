import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextFieldGroup, TextAreaFieldGroup, InputGroup, SelectListGroup } from '../common';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

function EditProfile(props) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const errors = useSelector(state => state.error);

  const [displaySocialInput, setDisplaySocialInput] = useState(false);
  const [handle, setHandle] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [skills, setSkills] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [bio, setBio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState({
    handle: ''
  }); 

  useEffect(() => {
    setError(errors)
  }, [errors])

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [])

  useEffect(() => {
    if(errors) {
      setError(errors)
    }
    
    // this profile is the one gotten from the state
    if(profile.profile !== null){
      let newProfile = profile.profile
      console.log('NewProfile', newProfile);
      // Bring skills array back to CSV
      const skillsCSV = newProfile.skills.join(',');

      // If profile field doesnt exist, make empty string
      newProfile.company = !isEmpty(newProfile.company) ? newProfile.company : '';
      newProfile.website = !isEmpty(newProfile.website) ? newProfile.website : '';
      newProfile.location  = !isEmpty(newProfile.location ) ? newProfile.location  : '';
      newProfile.githubUsername = !isEmpty(newProfile.githubUsername) ? newProfile.githubUsername : '';
      newProfile.bio = !isEmpty(newProfile.bio) ? newProfile.bio : '';
      newProfile.social = !isEmpty(newProfile.social) ? newProfile.social : {};
      newProfile.twitter = !isEmpty(newProfile.social.twitter)
        ? newProfile.social.twitter
        : '';
      newProfile.facebook = !isEmpty(newProfile.social.facebook)
        ? newProfile.social.facebook
        : '';
      newProfile.linkedin = !isEmpty(newProfile.social.linkedin)
        ? newProfile.social.linkedin
        : '';
      newProfile.youtube = !isEmpty(newProfile.social.youtube)
        ? newProfile.social.youtube
        : '';
      newProfile.instagram = !isEmpty(newProfile.social.instagram)
        ? newProfile.social.instagram
        : '';

        // Set component fields state
        setHandle(newProfile.handle);
        setCompany(newProfile.company);
        setWebsite(newProfile.website);
        setLocation(newProfile.location);
        setStatus(newProfile.status);
        setSkills(skillsCSV);
        setGithubUsername(newProfile.githubUsername);
        setBio(newProfile.bio);
        setTwitter(newProfile.twitter);
        setFacebook(newProfile.facebook);
        setLinkedIn(newProfile.linkedin);
        setYoutube(newProfile.youtube);
        setInstagram(newProfile.instagram);
    }else{
      console.log("I am not getting there")
    }
  }, [errors, profile.profile])

  let socialInputs;
  socialInputs = displaySocialInput && (<div>
    <InputGroup
      placeholder="Twitter Profile URL"
      name="twitter"
      value={twitter}
      icon="fab fa-twitter"
      onChange={(e=> setTwitter(e.target.value))}
      error={errors.twitter}
    />
    <InputGroup
      placeholder="Facebook Page URL"
      name="facebook"
      icon="fab fa-facebook"
      value={facebook}
      onChange={(e=> setFacebook(e.target.value))}
      error={errors.facebook}
    />

    <InputGroup
      placeholder="Linkedin Profile URL"
      name="linkedin"
      icon="fab fa-linkedin"
      value={linkedIn}
      onChange={(e=> setLinkedIn(e.target.value))}
      error={errors.linkedin}
    />

    <InputGroup
      placeholder="YouTube Channel URL"
      name="youtube"
      icon="fab fa-youtube"
      value={youtube}
      onChange={(e=> setYoutube(e.target.value))}
      error={errors.youtube}
    />

    <InputGroup
      placeholder="Instagram Page URL"
      name="instagram"
      icon="fab fa-instagram"
      value={instagram}
      onChange={(e=> setInstagram(e.target.value))}
      error={errors.instagram}
    />
  </div>)

  const onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle: handle,
      company: company,
      website: website,
      location: location,
      status: status,
      skills: skills,
      githubusername: githubUsername,
      bio: bio,
      twitter: twitter,
      facebook: facebook,
      linkedin: linkedIn,
      youtube: youtube,
      instagram: instagram
    }
    dispatch(createProfile(profileData, props.history));
  }
  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label:'Developer', value: 'Developer' }, 
    { label:'Junior Developer', value: 'Junior Developer' }, 
    { label:'Senior Developer', value: 'Senior Developer' }, 
    { label:'Manager', value: 'Manager' }, 
    { label:'Student or Learning', value: 'Student or Learning' }, 
    { label:'Instructor or Teacher', value: 'Instructor or Teacher' }, 
    { label:'Intern', value: 'Intern' }, 
    { label:'Other', value: 'Other' },
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">
              Edit Your Profile
            </h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out.
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={(e)=>setHandle(e.target.value)}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                error={errors.status}
                options={options}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={(e)=>setCompany(e.target.value)}
                error={errors.company}
                info="Could be your own company or on you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={(e)=>setWebsite(e.target.value)}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                error={errors.location}
                info="City or state"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={skills}
                onChange={(e)=>setSkills(e.target.value)}
                error={errors.skills}
                info="Please use comma seperated values(e.g. HTML, CSS, JS)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={githubUsername}
                onChange={(e)=>setGithubUsername(e.target.value)}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                error={errors.bio}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={(e)=> setDisplaySocialInput(!displaySocialInput)}
                  className="btn btn-light">
                    Add Social Network Links
                </button>
                <span className="text-muted">Optional </span>
              </div>
              {socialInputs}
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default withRouter(EditProfile);