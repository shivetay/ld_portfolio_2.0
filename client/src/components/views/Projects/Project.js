import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';

import Button from '../../common/Buttons/Button';
import Spinner from '../../common/Spinner/Spinner';

class Project extends Component {
  state = {
    project: [],
    loading: false,
  };

  componentDidMount() {
    this.ftechId();
  }

  ftechId = async () => {
    this.setState({ loading: true });
    try {
      await axios
        .get(`${API_URL}/projects/${this.props.match.params.projectId}`)
        .then((res) => this.setState({ project: res.data, loading: false }));
    } catch (err) {}
  };

  renderProject = () => {
    const {
      loading,
      project: { id, key, title, photo, tags, description, links, projectType },
    } = this.state;
    if (loading === true) {
      return <Spinner />;
    } else {
      return (
        <div>
          <div className='Projects__Project' key={key}>
            <h3 className='Projects-name'>{title}</h3>
            <img className='Projects-photo' src={photo} alt='project_img' />
            <span className='Projects-tech'>{tags}</span>
            <span className='Projects-tech'>{projectType}</span>
            <p className='Projects-descr'>{description}</p>
            <div className='Project-button'>
              <Button href={links}>Demo</Button>
              <Button href={links}>Code</Button>
            </div>
          </div>
          <Button to={`/projects`}>Back</Button>
        </div>
      );
    }
  };
  render() {
    return <Fragment>{this.renderProject()}</Fragment>;
  }
}

export default Project;
