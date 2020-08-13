import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './ProjectListAdmin.scss';

import ProjectTable from './ProjectTable';
import Spinner from '../../common/Spinner/Spinner';

class ProjectListAdmin extends Component {
  state = {
    data: [],
    loading: false,
    page: 1,
  };

  static propTypes = {
    getProj: PropTypes.func,
    delProject: PropTypes.func,
    projects: PropTypes.array,
    loading: PropTypes.bool,
  };
  componentDidMount() {
    const { page } = this.state;
    const { getProj } = this.props;
    getProj(page);
  }

  loadMore = (number) => {
    const { page } = this.state;
    const { getProj } = this.props;
    this.setState({ page: page + number });
    getProj(page + number);
  };

  loadLess = (number) => {
    const { page } = this.state;
    const { getProj } = this.props;
    this.setState({ page: page - number });
    getProj(page - number);
  };

  renderProjects = () => {
    const { projects, loading } = this.props;
    if (loading === true) {
      return <Spinner />;
    } else {
      return <ProjectTable projects={projects} />;
    }
  };

  renderPgaination = () => {
    const { projects, loading } = this.props;
    if (!projects.length && loading === true) {
      return <h2 className='Loader__Header'>Loading Projects</h2>;
    } else if (!projects.length) {
      return <h2 className='Loader__Header'>No more projects</h2>;
    } else {
    }
  };

  render() {
    const { page } = this.state;
    const { projects } = this.props;
    return (
      <Fragment>
        {this.renderPgaination()}
        {this.renderProjects()}
        <div className='Paggination'>
          {page > 1 || !projects.length ? (
            <div className='Paggination__Content'>
              <button
                className='btn Paggination-btn'
                onClick={() => this.loadLess(1)}>
                Previous ({this.state.page - 1})
              </button>
            </div>
          ) : (
            ''
          )}
          {projects.length ? (
            <div className='Paggination__Content'>
              <button
                className='btn Paggination-btn'
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

export default ProjectListAdmin;
