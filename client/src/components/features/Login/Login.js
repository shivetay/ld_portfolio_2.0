import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from '../../../config';
import Layout from '../../layout/MainLayout/Layout';

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    userRedirect: false,
  };

  signIn = (user) => {
    console.log('user', user);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(`${API_URL}/login`, user, config)
      .then((res) => console.log(res.data));
    this.setState({
      formData: { email: '', password: '' },
      userRedirect: true,
    });
  };

  onChange = (e) => {
    const { formData } = this.state;
    //assign form data to new variable
    let newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    this.setState({
      formData: newFormData,
    });
  };

  onSubmit = (e) => {
    const { password, email } = this.state.formData;
    e.preventDefault();
    this.signIn({ email, password });
  };

  formRender = (email, password) => (
    <form onSubmit={this.onSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={this.onChange}
          className='form-control'></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          name='password'
          minLength='6'
          value={password}
          onChange={this.onChange}
          className='form-control'></input>
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );
  render() {
    const { email, password } = this.state.formData;
    return (
      <Layout title='Login Form' description='Login to your account'>
        {this.formRender(email, password)}
      </Layout>
    );
  }
}

export default Login;
