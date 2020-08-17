/* single project */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './Project.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

import Button from '../../common/Buttons/Button';
import Spinner from '../../common/Spinner/Spinner';
import ShowImage from '../../common/ShowImage/ShowImage';

class Project extends Component {
  static propTypes = {
    project: PropTypes.object,
    projects: PropTypes.array,
    loading: PropTypes.bool,
    getOneProj: PropTypes.func,
  };

  componentDidMount() {
    const { getOneProj, projects } = this.props;

    for (let project of projects) {
      if (project._id === this.props.match.params.projectId) {
        console.log('proj id', project._id);
        getOneProj(project._id);
      }
    }
  }

  componentDidUpdate() {
    const { getOneProj, projects } = this.props;

    for (let project of projects) {
      if (project._id === this.props.match.params.projectId) {
        console.log('proj id', project._id);
        getOneProj(project._id);
      }
    }
  }

  renderLinks = () => {
    const { loading, project } = this.props;
    return loading ? (
      <h1>Generating links...</h1>
    ) : (
      <Fragment>
        <Button href={project.links.demo}>
          <FontAwesomeIcon icon={faTerminal} />
        </Button>
        <Button href={project.links.git}>
          <FontAwesomeIcon icon={faGithub} />
        </Button>
      </Fragment>
    );
  };

  renderProject = () => {
    const { loading, project } = this.props;
    if (loading === true || !project) {
      return <Spinner />;
    } else {
      return (
        <section className='Project' key={project.key}>
          <div className='Project__Container'>
            <div className='Project__Proj-header'>
              <h3 className='Project-name'>{project.title}</h3>
              <p className='Project-type'>{project.projectType}</p>
            </div>
            <div className='Project__Proj-container'>
              <div className='Project__Proj-photo'>
                <span>
                  <ShowImage
                    className='photo'
                    item={project._id}
                    url='project'
                    alt={project.title}
                  />
                </span>
                <div className='text'>
                  <p className='Project-tech'>
                    <strong>TAGS:</strong> {project.tags}
                  </p>
                </div>
              </div>
              {/* end photo */}
              <div className='Project__Proj-content'>
                <p className='Project-descr'>{project.description}</p>
                <div className='Project-button'>
                  {this.renderLinks()}
                  <Button to={`/projects`}>Back</Button>
                </div>
              </div>
            </div>
            {/* end container */}
          </div>
        </section>
      );
    }
  };
  render() {
    return <Fragment>{this.renderProject()}</Fragment>;
  }
}

export default Project;
