import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../../config';

import { authenticateUser, isAuthUser } from '../../../utils/utils';
import Layout from '../../layout/MainLayout/Layout';
import Button from '../../common/Buttons/Button';

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    userRedirect: false,
    logIn: false,
  };

  componentDidMount() {
    const logIn = localStorage.getItem('jwt') === true;
    this.setState({ logIn });
    if (logIn === true) {
      this.redirectUser();
    }
  }

  signIn = (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(`${API_URL}/login`, user, config)
      .then((res) => authenticateUser(res.data));
    this.setState({
      formData: { email: '', password: '' },
      userRedirect: true,
      logIn: true,
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
    this.setState({
      userRedirect: true,
    });
  };

  formRender = (email, password) => {
    return (
      <Fragment>
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
          <Button>Login</Button>
        </form>
      </Fragment>
    );
  };

  redirectUser = () => {
    const { userRedirect, logIn } = this.state;
    const { user } = isAuthUser();
    if (userRedirect === true) {
      console.log('user role', typeof user.role);
      if (logIn === true || user.role === 2308) {
        console.log('admin');
        return <Redirect to='/admin/dashboard' />;
      } else {
        console.log('user');
        return <Redirect to='/users/me' />;
      }
    }
  };

  render() {
    const { email, password } = this.state.formData;
    return (
      <Layout title='Login Form' description='Login to your account'>
        {/* {!localStorage.getItem('jwt')
          ? this.formRender(email, password)
          : this.redirectUser()} */}
        {this.formRender(email, password)}
        {this.redirectUser()}
      </Layout>
    );
  }
}

export default Login;