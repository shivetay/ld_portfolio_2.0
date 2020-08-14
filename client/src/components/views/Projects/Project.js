/* single project for projects publick */

import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';

import './Project.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

import Button from '../../common/Buttons/Button';
import Spinner from '../../common/Spinner/Spinner';
import ShowImage from '../../common/ShowImage/ShowImage';

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
        .then((res) =>
          this.setState({
            project: res.data,
            loading: false,
          })
        );
    } catch (err) {}
  };

  renderProject = () => {
    const {
      loading,
      project: { _id, key, title, tags, description, links, projectType },
    } = this.state;
    if (loading === true) {
      return <Spinner />;
    } else {
      return (
        <section className='Project' key={key}>
          <div className='Project__Container'>
            <div className='Project__Proj-header'>
              <h3 className='Project-name'>{title}</h3>
              <p className='Project-type'>{projectType}</p>
            </div>

            <div className='Project__Proj-container'>
              <div className='Project__Proj-photo'>
                <span>
                  <ShowImage
                    className='photo'
                    item={_id}
                    url='project'
                    alt={title}
                  />
                </span>
                <div className='text'>
                  <p className='Project-tech'>
                    <strong>TAGS:</strong> {tags}
                  </p>
                </div>
              </div>
              {/* end photo */}
              <div className='Project__Proj-content'>
                <p className='Project-descr'>{description}</p>
                <div className='Project-button'>
                  {loading ? (
                    <h1>Generating links...</h1>
                  ) : (
                    <Fragment>
                      <Button href='#'>
                        <FontAwesomeIcon icon={faTerminal} />
                      </Button>
                      <Button href='#'>
                        <FontAwesomeIcon icon={faGithub} />
                      </Button>
                    </Fragment>
                  )}
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
