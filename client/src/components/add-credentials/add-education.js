import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextAreaFieldGroup, TextFieldGroup } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../routes';
import { addEducation } from '../../actions/profileActions';


function AddEducation(props) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile)
  const stateErrors = useSelector(state => state.error)
  
  const [school,setSchool] = useState('');
  const [degree,setDegree] = useState('');
  const [fieldOfStudy,setFieldOfStudy] = useState('');
  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  const [current,setCurrent] = useState(false);
  const [description,setDescription] = useState('');
  const [errors,setErrors] = useState({});
  const [disabled,setDisabled] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const eduData = {
      school: school,
      degree: degree,
      fieldOfStudy: fieldOfStudy,
      from: from,
      to: to,
      current: current,
      description: description
    }
    dispatch(addEducation(eduData, props.history))
  }

  useEffect(() => {
    setErrors(stateErrors);
  }, [stateErrors])

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={routes.dashboard.path} className="btn btn-light">
              Go back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">Add any school, bootcamp,e.t.c. that you have attended.</p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Field of Study"
                  name="fieldOfStudy"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  error={errors.fieldOfStudy}
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
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={errors.description}
                  info="Tell us about the program that you were in"
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

export default withRouter(AddEducation);