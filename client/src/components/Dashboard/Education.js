import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

function Education(props) {
  const dispatch = useDispatch();
  const { education } = props;

  const onDeleteClick = (id) => {
    dispatch(deleteEducation(id, props.history));
  }

  let tableEducation = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
      </td>
      <td><button onClick={() => onDeleteClick(edu._id)} className="btn btn-danger">Delete</button></td>
    </tr>
  ))
  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableEducation }
          </tbody>
        </table>
      

    </div>
  )
}

export default withRouter(Education);