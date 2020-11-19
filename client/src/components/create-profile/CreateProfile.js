import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextFieldGroup, TextAreaFieldGroup, InputGroup, SelectListGroup } from '../common';
import {createProfile} from '../../actions/profileActions';

function CreateProfile(props) {
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

  let socialInputs;
  socialInputs = displaySocialInput && (<div>
    <InputGroup
      placeholder="Twitter Profile URL"
      name="twitter"
      value={twitter}
      icon="fab fa-twitter"
      onChange={(e=> setTwitter(e.target.value))}
      error={error.twitter}
    />
    <InputGroup
      placeholder="Facebook Page URL"
      name="facebook"
      icon="fab fa-facebook"
      value={facebook}
      onChange={(e=> setFacebook(e.target.value))}
      error={error.facebook}
    />

    <InputGroup
      placeholder="Linkedin Profile URL"
      name="linkedin"
      icon="fab fa-linkedin"
      value={linkedIn}
      onChange={(e=> setLinkedIn(e.target.value))}
      error={error.linkedin}
    />

    <InputGroup
      placeholder="YouTube Channel URL"
      name="youtube"
      icon="fab fa-youtube"
      value={youtube}
      onChange={(e=> setYoutube(e.target.value))}
      error={error.youtube}
    />

    <InputGroup
      placeholder="Instagram Page URL"
      name="instagram"
      icon="fab fa-instagram"
      value={instagram}
      onChange={(e=> setInstagram(e.target.value))}
      error={error.instagram}
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
    console.log(profileData);
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
              Create Your Profile
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
                error={error.handle}
                info="A unique handle for your profile URL. Your full name, company name"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                error={error.status}
                options={options}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={(e)=>setCompany(e.target.value)}
                error={error.company}
                info="Could be your own company or on you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={(e)=>setWebsite(e.target.value)}
                error={error.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                error={error.location}
                info="City or state"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={skills}
                onChange={(e)=>setSkills(e.target.value)}
                error={error.skills}
                info="Please use comma seperated values(e.g. HTML, CSS, JS)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={githubUsername}
                onChange={(e)=>setGithubUsername(e.target.value)}
                error={error.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                error={error.bio}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={()=> {
                    return setDisplaySocialInput(!displaySocialInput);
                  }}
                  className="btn btn-primary mr-2">
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

export default withRouter(CreateProfile);