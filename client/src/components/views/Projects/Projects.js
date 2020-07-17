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
    page: 1,
  };
  componentDidMount() {
    const { page } = this.state;
    this.getProjects(page);
  }

  loadMore = (number) => {
    const { page } = this.state;
    this.setState({ page: page + number });
    this.getProjects(page + number);
  };

  loadLess = (number) => {
    const { page } = this.state;
    this.setState({ page: page - number });
    this.getProjects(page - number);
  };

  getProjects = async (page) => {
    this.setState({ loading: true });
    try {
      await axios.get(`${API_URL}/projects/?page=${page}`).then((res) =>
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
          <div className='Projects__Container'>
            <ProjectList projects={data} />
          </div>
        </section>
      );
    }
  };

  render() {
    const { data, page } = this.state;
    return (
      <Fragment>
        <h2 className='mt-5 mb-5'>{!data.length ? 'No more projects!' : ''}</h2>
        {this.renderProjects()}
        {page > 1 ? (
          <button
            className='btn btn-raised btn-warning mr-5 mt-5 mb-5'
            onClick={() => this.loadLess(1)}>
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ''
        )}

        {data.length ? (
          <button
            className='btn btn-raised btn-success mt-5 mb-5'
            onClick={() => this.loadMore(1)}>
            Next ({page + 1})
          </button>
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}

export default Projects;
