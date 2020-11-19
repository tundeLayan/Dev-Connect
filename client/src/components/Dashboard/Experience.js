import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

function Experience(props) {
  const dispatch = useDispatch();
  const { experience } = props;

  const onDeleteClick = (id) => {
    dispatch(deleteExperience(id, props.history));
  }

  let tableExperience = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
      </td>
      <td><button onClick={() => onDeleteClick(exp._id)} className="btn btn-danger">Delete</button></td>
    </tr>
  ))
  return (
    <div>
      <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableExperience}
          </tbody>
        </table>
      

    </div>
  )
}

export default withRouter(Experience);