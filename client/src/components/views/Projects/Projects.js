import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';

import './Projects.scss';

import ProjectList from './ProjectList';
import Spinner from '../../common/Spinner/Spinner';

class Projects extends Component {
  state = {
    data: [],
    loading: false,
  };
  componentWillMount() {
    this.getProjects();
  }

  getProjects = async () => {
    this.setState({ loading: true });
    try {
      await axios.get(`${API_URL}/projects`).then((res) =>
        this.setState({
          data: res.data,
          loading: false,
        })
      );
    } catch (err) {}
  };

  renderProjects = () => {
    const { loading, data } = this.state;
    if (loading === true) {
      return <Spinner />;
    } else {
      return (
        <section className='Projects'>
          <div className='Project__Container'>
            <ProjectList projects={data} />
          </div>
        </section>
      );
    }
  };

  render() {
    return <Fragment>{this.renderProjects()}</Fragment>;
  }
}

export default Projects;
