/* display for publick projects */

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

  renderPgaination = () => {
    const { data, loading } = this.state;
    if (!data.length && loading === true) {
      return <h2 className='Loader__Header'>Loading Projects</h2>;
    } else if (!data.length) {
      return <h2 className='Loader__Header'>No more projects</h2>;
    } else {
    }
  };

  render() {
    const { data, page } = this.state;
    return (
      <Fragment>
        {this.renderPgaination()}
        {this.renderProjects()}
        <div className='Paggination'>
          {page > 1 || !data.length ? (
            <div className='Paggination__Content'>
              <button
                className='button Paggination-btn'
                onClick={() => this.loadLess(1)}>
                Previous ({this.state.page - 1})
              </button>
            </div>
          ) : (
            ''
          )}
          {data.length ? (
            <div className='Paggination__Content'>
              <button
                className='button Paggination-btn'
                onClick={() => this.loadMore(1)}>
                Next ({page + 1})
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </Fragment>
    );
  }
}

export default Projects;
