import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';


function ProfileGithub(props) {
  const [clientId, setClientId] = useState('82afcba27ffb1f48f59a');
  const [clientSecret, setClientSecret] = useState("0ab783c409831734b4dd923a6a2c0a6bcb6d479a");
  const [count, setCount] = useState(5);
  const [sort, setSort] = useState("created: asc");
  const [repos, setRepos] = useState([]);
  const refs = React.useRef();

  useEffect(()=>{
    const { username } = props;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        if (refs.myRef) {
          setRepos(data);
        }
      })
      .catch(err => console.log(err)); 
  })
  const repoItems = repos.map(repo => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <Link to={repo.html_url} className="text-info" target="_blank">
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">
            Forks: {repo.forks_count}
          </span>
        </div>
      </div>
    </div>
  ));
  return (
    <div ref="myRef">
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  )
}

export default ProfileGithub;