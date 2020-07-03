import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';

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
    console.log('state project', this.state.project);
    console.log('state project links', this.state.project.links);
    if (loading === true) {
      return <Spinner />;
    } else {
      return (
        <div>
          <div className='Projects__Project' key={key}>
            <h3 className='Projects-name'>{title}</h3>
            <ShowImage item={_id} url='project' alt={title} />
            <span className='Projects-tech'>{tags}</span>
            <span className='Projects-tech'>{projectType}</span>
            <p className='Projects-descr'>{description}</p>
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
          <Button to={`/projects`}>Back</Button>
        </div>
      );
    }
  };
  render() {
    return <Fragment>{this.renderProject()}</Fragment>;
  }
}

export default Project;
