import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';

import './Project.scss';

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
        <div className='Project'>
          <div className='Project__Proj' key={key}>
            <h3 className='Project-name'>{title}</h3>
            <div className='Project__Proj-photo'>
              <ShowImage
                className='Projects-photo'
                item={_id}
                url='project'
                alt={title}
              />
            </div>
            <div className='Project__Proj-content'>
              <span className='Project-tech'>{tags}</span>
              <span className='Project-tech'>{projectType}</span>
              <p className='Project-descr'>{description}</p>
              <div className='Project-button'>
                {!loading ? (
                  <h1>Generating links...</h1>
                ) : (
                  <Fragment>
                    <Button href={links.demo}>Demo</Button>
                    <Button href={links.git}>Code</Button>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          <div className='Project-button'>
            <Button to={`/projects`}>Back</Button>
          </div>
        </div>
      );
    }
  };
  render() {
    return <Fragment>{this.renderProject()}</Fragment>;
  }
}

export default Project;
