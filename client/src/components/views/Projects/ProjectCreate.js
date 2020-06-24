import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';
import { authenticateUser, isAuthUser } from '../../../utils/utils';

class ProjectCreate extends Component {
  state = {
    formData: {
      creator: '',
      title: '',
      description: '',
      photo: '',
      tags: '',
      projectType: '',
      links: '',
      front: '',
      back: '',
      mern: '',
      js: '',
      html: '',
    },
    displayType: false,
  };

  toggleType = () => {
    const { toggleType } = this.state;
    if (!toggleType) {
      this.setState({ toggleType: true });
    } else {
      this.setState({ toggleType: false });
    }
  };

  createProject = async (formData) => {
    const { token } = isAuthUser();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    try {
      await axios
        .post(
          `${API_URL}/projects/create/${this.props.match.params.userId}`,
          formData,
          config
        )
        .then((res) => console.log(res.data));
    } catch (err) {}
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
    e.preventDefault();
    this.createProject(formData);
  };

  render() {
    const {
      displayType,
      formData: {
        creator,
        title,
        description,
        photo,
        tags,
        projectType,
        links,
        mern,
        front,
        back,
        html,
        js,
      },
    } = this.state;

    return (
      <section className=''>
        <h1 className=''>Create Project</h1>
        <p className=''>
          <i className='fas fa-user'></i> Add project information
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => this.onSubmit(e)}>
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
              placeholder='Photo'
              name='photo'
              value={photo}
              onChange={this.onChange}
            />
            <small className='form-text'>Add project preview.</small>
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
          <div className='my-2'>
            <button onClick={this.toggleType} type='button' className=''>
              Add Project Type
            </button>
            <span>Optional</span>
          </div>
          {/* {displayType && (
            <div>
              <div className=''>
                <i className=''></i>
                <input
                  type='text'
                  placeholder='Front-end'
                  name='front'
                  value={front}
                  onChange={this.onChange}
                />
              </div>

              <div className=''>
                <i className=''></i>
                <input
                  type='text'
                  placeholder='Back-end'
                  name='back'
                  value={back}
                  onChange={this.onChange}
                />
              </div>

              <div className=''>
                <i className=''></i>
                <input
                  type='text'
                  placeholder='MERN'
                  name='mern'
                  value={mern}
                  onChange={this.onChange}
                />
              </div>

              <div className=''>
                <i className=''></i>
                <input
                  type='text'
                  placeholder='Vanila Js'
                  name='js'
                  value={js}
                  onChange={this.onChange}
                />
              </div>

              <div className=''>
                <i className=''></i>
                <input
                  type='text'
                  placeholder='HTML/CSS'
                  name='html'
                  value={html}
                  onChange={this.onChange}
                />
              </div>
            </div>
          )} */}

          <input type='submit' className='btn btn-primary my-1' />
          <a className='btn btn-light my-1' href='/projects'>
            Go Back
          </a>
        </form>
      </section>
    );
  }
}

export default ProjectCreate;
