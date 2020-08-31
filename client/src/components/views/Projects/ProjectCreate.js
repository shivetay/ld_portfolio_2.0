import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../common/Buttons/Button';

import './ProjectCreate.scss';

import { isAuthUser } from '../../../utils/utils';

class ProjectCreate extends Component {
  state = {
    formData: {
      creator: '',
      title: '',
      description: '',
      shortDescription: '',
      photo: '',
      tags: '',
      projectType: '',
      git: '',
      demo: '',
    },
    displayLinks: false,
  };

  static propTypes = {
    newProject: PropTypes.func,
    history: PropTypes.any,
    isAuth: PropTypes.bool,
    user: PropTypes.object,
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
    const { formData } = this.state;
    const { newProject, user, history } = this.props;

    const fileToUpload = document.querySelector('#photoID');
    const sendData = new FormData();
    const creatorProject = user._id;

    sendData.append('title', formData.title);
    sendData.append('description', formData.description);
    sendData.append('photo', fileToUpload.files[0]);
    sendData.append('tags', formData.tags);
    sendData.append('projectType', formData.projectType);
    sendData.append('shortDescription', formData.shortDescription);
    sendData.append('git', formData.git);
    sendData.append('demo', formData.demo);
    sendData.append('creator', user._id);

    e.preventDefault();
    newProject(sendData, history, creatorProject);
  };

  toggleLinks = () => {
    const { displayLinks } = this.state;
    if (!displayLinks) {
      this.setState({ displayLinks: true });
    } else {
      this.setState({ displayLinks: false });
    }
  };

  render() {
    localStorage.user = isAuthUser();
    const {
      displayLinks,
      formData: {
        title,
        description,
        shortDescription,
        photo,
        tags,
        projectType,
        git,
        demo,
      },
    } = this.state;

    return (
      <section className='Create'>
        <h1 className=''>Create Project</h1>
        <p className=''>
          <i className='fas fa-user'></i> Add project information
        </p>
        <small>* = required field</small>
        <form
          encType='multipart/form-data'
          className='form'
          onSubmit={(e) => this.onSubmit(e)}>
          <div className='input-field'>
            <select
              className='browser-default'
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
          <div className='input-field'>
            <input
              type='text'
              placeholder='Title'
              maxLength='18'
              name='title'
              value={title}
              onChange={this.onChange}
            />
            <small className='form-text'>Add project title.</small>
          </div>
          <div className='input-field'>
            <textarea
              className='materialize-textarea'
              type='text'
              placeholder='Description'
              name='description'
              maxLength='560'
              data-length='560'
              value={description}
              onChange={this.onChange}
            />
            <small className='form-text'>Add project description max 560</small>
          </div>
          <div className='input-field'>
            <textarea
              className='materialize-textarea'
              type='text'
              placeholder='Short description'
              name='shortDescription'
              maxLength='20'
              data-length='20'
              value={shortDescription}
              onChange={this.onChange}></textarea>
            <small className='form-text'>
              Add project short description max 50
            </small>
          </div>
          <div className='input-field'>
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
          <div className='file-field input-field'>
            <div className='btn'>
              <span>Add Photo</span>
              <input
                id='photoID'
                type='file'
                accept='.jpg, .png, .jpeg'
                placeholder='Photo'
                name='photo'
                value={photo}
                onChange={this.onChange}
              />
            </div>
            <div className='file-path-wrapper'>
              <input type='text' className='file-path' />
            </div>
          </div>
          <div className='my-2'>
            <button onClick={this.toggleLinks} type='button' className='button'>
              Add Project Links
            </button>
            {displayLinks && (
              <div>
                <div className='input-field'>
                  <i className=''></i>
                  <input
                    type='text'
                    placeholder='Git URL'
                    name='git'
                    value={git}
                    onChange={this.onChange}
                  />
                </div>

                <div className='input-field'>
                  <i className=''></i>
                  <input
                    type='text'
                    placeholder='Demo URL'
                    name='demo'
                    value={demo}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            )}
          </div>
          <input type='submit' className='btn' />
          <Button className='button' to='/admin/dashboard'>
            Go Back
          </Button>
        </form>
      </section>
    );
  }
}

export default ProjectCreate;
