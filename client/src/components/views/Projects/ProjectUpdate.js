import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Button from '../../common/Buttons/Button';
import Spinner from '../../common/Spinner/Spinner';

import { API_URL } from '../../../config';
import { isAuthUser } from '../../../utils/utils';

class ProjectUpdate extends Component {
  state = {
    formData: {
      creator: '',
      title: '',
      description: '',
      shortDescription: '',
      photo: '',
      tags: '',
      projectType: '',
      links: {},
    },
    displayLinks: false,
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
            formData: res.data,
            loading: false,
          })
        );
    } catch (err) {
      console.log(err);
    }
  };

  updateProject = async (formData) => {
    this.setState({ loading: true });
    const { token } = isAuthUser();
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `${token}`,
      },
    };

    try {
      console.log(
        'formdata update',
        `${API_URL}/projects/update/${this.props.match.params.projectId}`
      );
      await axios
        .put(
          `${API_URL}/projects/update/${this.props.match.params.projectId}`,
          formData,
          config
        )
        .then((res) => console.log('res', res));

      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  onChange = (e) => {
    // setting formData in the state properly
    const { formData } = this.state;
    let newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    this.setState({
      formData: newFormData,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;

    const fileToUpload = document.querySelector('#photoID');
    const sendData = new FormData();

    sendData.append('title', formData.title);
    sendData.append('description', formData.description);
    sendData.append('photo', fileToUpload.files[0]);
    sendData.append('tags', formData.tags);
    sendData.append('projectType', formData.projectType);
    sendData.append('shortDescription', formData.shortDescription);
    sendData.append('git', formData.git);
    sendData.append('demo', formData.demo);
    sendData.append('creator', formData.creator);

    console.log('sendData', formData.tags);

    this.updateProject(sendData);
  };

  toggleLinks = () => {
    const { displayLinks } = this.state;
    if (!displayLinks) {
      this.setState({ displayLinks: true });
    } else {
      this.setState({ displayLinks: false });
    }
  };

  renderProject = () => {
    const {
      loading,
      displayLinks,
      formData: {
        title,
        description,
        shortDescription,
        photo,
        tags,
        projectType,
        links,
      },
    } = this.state;
    console.log('state form', this.state.formData);
    if (loading === true) {
      return <Spinner />;
    } else {
      return (
        <section className=''>
          <h1 className=''>Update Project</h1>
          <p className=''>
            <i className='fas fa-user'></i> Add project information
          </p>
          <small>* = required field</small>
          <form
            encType='multipart/form-data'
            className='form'
            onSubmit={(e) => this.onSubmit(e)}>
            <div className=''>
              <select
                name='projectType'
                value={projectType}
                onChange={this.onChange}>
                <option value='0'>* Select Project Type Status</option>
                <option value='Front-end'>Front-end</option>
                <option value='Back-end'>Back-end</option>
                <option value='MERN'>MERN</option>
                <option value='Vanila JS'>Vanila JS</option>
                <option value='html'>HTML/CSS</option>
              </select>
              <small className='form-text'>Select a project type.</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Title'
                name='title'
                value={title}
                onChange={this.onChange}
              />
              <small className='form-text'>Add project title.</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Description'
                name='description'
                value={description}
                onChange={this.onChange}
              />
              <small className='form-text'>Add project description</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Short description'
                name='shortDescription'
                value={shortDescription}
                onChange={this.onChange}
              />
              <small className='form-text'>Add project short description</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Tags'
                name='tags'
                value={tags}
                onChange={this.onChange}
              />
              <small className='form-text'>
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className='form-group'>
              <input
                id='photoID'
                type='file'
                accept='.jpg, .png, .jpeg'
                placeholder='Photo'
                name='photo'
                // value={photo}
                onChange={this.onChange}
              />
              <small className='form-text'>Add project preview.</small>
            </div>
            <div className='my-2'>
              <button onClick={this.toggleLinks} type='button' className=''>
                Add Project Links
              </button>
              <span>Optional</span>

              {displayLinks && (
                <div>
                  <div className=''>
                    <i className=''></i>
                    <input
                      type='text'
                      placeholder='Git URL'
                      name='git'
                      value={links.git}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className=''>
                    <i className=''></i>
                    <input
                      type='text'
                      placeholder='Demo URL'
                      name='demo'
                      value={links.demo}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <input type='submit' className='btn btn-primary my-1' />
            <Button className='btn btn-light my-1' to='/projects'>
              Go Back
            </Button>
          </form>
        </section>
      );
    }
  };

  render() {
    return <Fragment>{this.renderProject()}</Fragment>;
  }
}

export default ProjectUpdate;
