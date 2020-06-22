import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';

import './Projects.scss';

import ProjectList from './ProjectList';

class Projects extends Component {
  state = {
    data: [],
    loading: false,
  };
  componentWillMount() {
    this.getProjects();
  }

  getProjects = async () => {
    try {
      await axios.get(`${API_URL}/projects`).then((res) =>
        this.setState({
          data: res.data,
          loading: true,
        })
      );
    } catch (err) {}
  };

  render() {
    const { data } = this.state;
    return (
      <section className='Projects'>
        <div className='Project__Container'>
          <ProjectList projects={data} />
        </div>
      </section>
    );
  }
}

export default Projects;
