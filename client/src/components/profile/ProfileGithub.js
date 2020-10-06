import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((rep) => (
          <div key={rep.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={rep.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {rep.name}
                </a>
              </h4>
              <p>{rep.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {rep.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {rep.watchers_count}
                </li>
                <li className='badge badge-light'> Forks: {rep.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
