import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextAreaFieldGroup, TextFieldGroup } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../routes';
import { addExperience } from '../../actions/profileActions';


function AddExperience(props) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile)
  const stateErrors = useSelector(state => state.error)

  const [company,setCompany] = useState('');
  const [title,setTitle] = useState('');
  const [location,setLocation] = useState('');
  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  const [current,setCurrent] = useState(false);
  const [description,setDescription] = useState('');
  const [errors,setErrors] = useState({});
  const [disabled,setDisabled] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const expData = {
      company: company,
      title: title,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description
    }
    dispatch(addExperience(expData, props.history))
  }

  useEffect(() => {
    setErrors(stateErrors);
  }, [stateErrors])

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={routes.dashboard.path} className="btn btn-light">
              Go back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">Add any job or position that you have had in the past or current.</p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  error={errors.to}
                  disabled={disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={() => {
                      setDisabled(!disabled)
                      setCurrent(!current)
                    }}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={errors.description}
                  info="Tell us about the the position"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default withRouter(AddExperience);