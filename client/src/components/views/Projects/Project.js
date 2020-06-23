import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';

import Button from '../../common/Buttons/Button';

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
  render() {
    const { loading } = this.state;
    const {
      project: { id, key, title, photo, tags, description, links },
    } = this.state;
    return (
      <div>
        <div className='Projects__Project' key={key}>
          {/* <Button to={`/projects/${project._id}`}>
            <h3 className='Projects-name'>{title}</h3>
          </Button> */}
          <h3 className='Projects-name'>{title}</h3>
          <img className='Projects-photo' src={photo} alt='project_img' />
          <span className='Projects-tech'>{tags}</span>
          <p className='Projects-descr'>{description}</p>
          <div className='Project-button'>
            <button className='btn'>
              <a className='btn-aTag' href={links}>
                Demo
              </a>
            </button>
            <button className='btn'>
              <a className='btn-aTag' href={links}>
                Code
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
