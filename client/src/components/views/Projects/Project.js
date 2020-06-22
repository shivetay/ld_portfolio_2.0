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
    // const { id } = this.props;
    // const projectId = this.props.match.params.id;
    this.ftechId();
  }

  ftechId = (id) => {
    axios
      .get(`${API_URL}/projects/${id}`)
      .then((res) => this.setState({ project: res.data, loading: true }));
  };
  render() {
    const { loading } = this.state;
    const { id, key, title, photo, tags, description, links } = this.props;
    return (
      <div>
        <div className='Projects__Project' key={key}>
          <Button to={`/projects/${id}`}>
            <h3 className='Projects-name'>{title}</h3>
          </Button>

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
