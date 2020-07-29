import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';

// import { API_URL } from '../../../config';

import './Login.scss';

import { authenticateUser, isAuthUser } from '../../../utils/utils';
import Layout from '../../layout/MainLayout/Layout';
import Button from '../../common/Buttons/Button';

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
  };

  static propTypes = {
    logUser: PropTypes.func,
    isAuth: PropTypes.bool,
    user: PropTypes.object,
  };

  // signIn = async (user) => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   try {
  //     await axios
  //       .post(`${API_URL}/login`, user, config)
  //       .then((res) => authenticateUser(res.data));
  //     this.setState({
  //       formData: { email: '', password: '' },
  //       userRedirect: true,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    const { logUser } = this.props;
    e.preventDefault();
    logUser({ email, password });
  };

  formRender = (email, password) => {
    return (
      <div className='Login'>
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
      </div>
    );
  };

  redirectUser = () => {
    // const { userRedirect, logIn } = this.state;
    const { isAuth, user } = this.props;
    user = isAuthUser();
    if (isAuth === true) {
      if (localStorage.getItem('jwt')) {
        if (user.role === 2308) {
          return <Redirect to='/admin/dashboard' />;
        } else {
          return <Redirect to='/users/me' />;
        }
      } else {
        return <Redirect to='/' />;
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
      </Layout>
    );
  }
}

export default Login;
